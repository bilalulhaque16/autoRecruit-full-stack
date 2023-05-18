import { getNamespace } from "continuation-local-storage";

import { initAdminDbConnection } from "./config/admin.config.js"; 

import { initTenantDbConnection } from "./config/tenant.config.js";

import * as tenantService from "../service/tenant.service.js";


let connectionMap;
let adminDbConnection;

/**
 * Create knex instance for all the tenants defined in common database and store in a map.
 **/
const connectAllDb = async () => {

  // console.log("Here we are connecting connect all db *****************")

  let tenants;
  
  // Creates admin db connnection
  // const ADMIN_DB_URI = `${process.env.BASE_DB_URI}/${process.env.ADMIN_DB_NAME}`;
  // const ADMIN_DB_URI = `mongodb+srv://bilal:pass123@cluster0.av5sgfj.mongodb.net/${process.env.ADMIN_DB_NAME}?retryWrites=true`;
  const db_url = process.env.BASE_DB_URI;
  const index = db_url.indexOf("?") ;
  const database_name = process.env.ADMIN_DB_NAME
  const ADMIN_DB_URI = db_url.slice(0, index) + database_name + db_url.slice(index);

  adminDbConnection = initAdminDbConnection(ADMIN_DB_URI);
  // console.log("connectAllDb adminDbConnection ===>", adminDbConnection.name);
  
  try {
    tenants = await tenantService.getAllTenantsService(adminDbConnection);
    // console.log("connectAllDb tenants ===>", tenants);
  } catch (e) {
    console.log("connectAllDb error", e);
    return;
  }

  connectionMap = tenants
    .map(tenant => {
      return {
        [tenant.company_name]: initTenantDbConnection(tenant.dbURI)
      };
    })
    .reduce((prev, next) => {
      return Object.assign({}, prev, next);
    }, {});

  // console.log("connectAllDb connectionMap =====>", connectionMap);
};

/**
 * Get the connection information (knex instance) for the given tenant's slug.
 */
const getConnectionByTenant = tenantName => {
  // console.log(`Getting connection for ${tenantName}`);
  // console.log(connectionMap)
  if (connectionMap) {
    return connectionMap[tenantName];
  }
};

/**
 * Get the admin db connection.
 */
const getAdminConnection = () => {
  if (adminDbConnection) {
    console.log("Getting adminDbConnection");
    return adminDbConnection;
  }
};

/**
 * Get the connection information (knex instance) for current context. Here we have used a
 * getNamespace from 'continuation-local-storage'. This will let us get / set any
 * information and binds the information to current request context.
 */
const getConnection = () => {
  const nameSpace = getNamespace("unique context");
  const conn = nameSpace.get("connection");

  if (!conn) {
    throw new Error("Connection is not set for any tenant database");
  }

  return conn;
  
};
export{
  connectAllDb,
  getAdminConnection,
  getConnection,
  getConnectionByTenant
};