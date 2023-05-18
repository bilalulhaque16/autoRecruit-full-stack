import mongoose from "mongoose";
import {
  createTenantData,
  findSpecificTenantData,
  updateSpecificTenantData,
  getAllTenantData,
} from "../util/db_calls/tenant.calls.js";

import * as role_call from "../util/db_calls/role_access.call.js";

import * as status_code from "../util/status_codes.util.js";
import jwt from "jsonwebtoken";
import transporter from "../util/smtp/transporter.smtp.js";
import user_account from "../model/user_account.model.js";
import user_type from "../model/user_type.model.js";
import role from "../model/role.model.js";
import role_group from "../model/role_group.model.js";
import  company from "../model/company.model.js";
import ROLES from "../util/roles_list.util.js";


import { connectAllDb } from "../db/connectionManager.config.js";
import {
  clientIdGenerate,
  clientSecretGenerate,
} from "../util/id_generate/oAuth.generate.js";

const getAllTenantsService = async (adminDbConnection) => {
  const Tenant = await adminDbConnection.model("tenant");
  const tenants = await getAllTenantData(Tenant, {});
  // console.log(tenants)
  return tenants;
};

const createTenantService = async (adminDbConnection, request) => {
  const Tenant = await adminDbConnection.model("tenant");
  const company_name = request.body.company_name;
  const tenantPresent = await findSpecificTenantData(Tenant, { company_name });

  if (tenantPresent) return status_code.OK("Tenant Already Present");

  const newTenant = await createTenantData(Tenant, request);

  const url = request.protocol + "://" + request.get("host");
  const secret = "secret";
  const payload = {
    name: newTenant.company_name,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "6h" });
  const link = `${url}/api/v1/tenant/${newTenant.company_name}/confirmation/${token}`;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: request.body.email,
    subject: "Verify account company",
    html: `<p> Verify your company by clicking on this link ${link} </p>`,
  };
  await transporter.sendMail(mailOptions);

  return status_code.OK({
    message: "Go to this link to verify your company",
    link: link,
  });
};

const verifyAdminCompanyService = async (adminDbConnection, request) => {
  const Tenant = await adminDbConnection.model("tenant");
  const Role = await adminDbConnection.model("role");
  const Role_Group = await adminDbConnection.model("role_group");

  const secret = "secret";
  const payload = jwt.verify(request.params.token, secret);

  const tenant_data = await updateSpecificTenantData(
    Tenant,
    { company_name: request.params.companyName },
    { verified: true }
  );
  const url = request.protocol + "://" + request.get("host");
  const link = `${url}/api/v1/${payload.name}`;

  const role_data = await role_call.getAllUserRole(Role, {});
  const role_group_data = await role_call.getAllRoleGroup(Role_Group, {});

  mongoose.disconnect();

  const client_id = clientIdGenerate(tenant_data.company_name);
  const client_secret = await clientSecretGenerate(client_id);

  await mongoose.connect(tenant_data.dbURI);

  const newType = new user_type({
    user_type_name: ROLES.Admin
  })
  newType.save();

  const newUser = new user_account({
    user_type_id: newType._id,
    full_name: tenant_data.full_name,
    email: tenant_data.email,
    password: tenant_data.password,
    company_name: tenant_data.company_name,
    is_active: true,
    clientId: client_id,
    clientSecret: client_secret,
  });
  newUser.save();
  
  const newCompany = new company({
    company_name: tenant_data.company_name
  })

  newCompany.save()

  role_group.insertMany(role_group_data);
  role.insertMany(role_data);

  connectAllDb();
  return status_code.OK({
    message:
      "Company has successfully registered. Please complete your remaining profile.",
    link: link,
  });
};

export { getAllTenantsService, createTenantService, verifyAdminCompanyService };
