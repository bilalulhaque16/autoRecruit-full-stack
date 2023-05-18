import { getConnection } from "../db/connectionManager.config.js";
import * as tenantService from "../service/tenant.service.js";


const getAllTenantsController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log("fetchAll dbConnection", dbConnection.name);
    const tenants = await tenantService.getAllTenantsService(dbConnection);
    res.status(200).json({ success: true, tenants });
  } catch (err) {
    res.json(err)
  }
};


const createTenantController = async (req, res) => {
    try {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   res.json({
      //     status: false,
      //     message: "Form validation error",
      //     errors: errors.array(),
      //   });
      // }
      // else{
        const dbConnection = getConnection();
        console.log("create dbConnection =======>", dbConnection.name);
        const created_data = await tenantService.createTenantService(dbConnection, req);
        res.status(created_data.status).json(created_data)
      // }
    } catch (error) {
      res.json(error)
    }
};


const verifyAdminCompanyController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log("fetchAll dbConnection", dbConnection.name);
    const data = await tenantService.verifyAdminCompanyService(dbConnection, req)
    res.status(data.status).json(data)
  } catch (error) {
    res.json(error)
  }
}








export {getAllTenantsController, createTenantController, verifyAdminCompanyController}