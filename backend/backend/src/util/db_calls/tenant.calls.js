import bcrypt from "bcrypt";

const createTenantData = async (modelName, request) => {
    const hashed_pwd = await bcrypt.hash(request.body.password, parseInt(process.env.SALT_ROUNDS));
    const newTenant = new modelName({
        full_name: request.body.full_name,
        email: request.body.email,
        password: hashed_pwd,
        company_name: request.body.company_name.replace(/\s/g, "").toLowerCase(),
        verified: false
    });
    // newTenant.dbURI = `${process.env.BASE_DB_URI}/mt_${newTenant.company_name}`,
    const db_url = process.env.BASE_DB_URI;
    const index = db_url.indexOf("?") ;
    const database_name = `mt_${newTenant.company_name}`
    const result = db_url.slice(0, index) + database_name + db_url.slice(index);
    newTenant.dbURI = result;
    
    newTenant.save()
    return newTenant;
  
}


const findSpecificTenantData = async (modelName, filter) => {
    const existingTenant = await modelName.findOne(filter);
    return existingTenant;
}

const updateSpecificTenantData = async (modelName, filter, update) => {
    const updateTenant = await modelName.findOneAndUpdate(filter, update);
    return updateTenant;
}

const getAllTenantData = async (modelName, filter) => {
    const tenant = await modelName.find(filter);
    return tenant;
}


export {createTenantData, findSpecificTenantData, updateSpecificTenantData, getAllTenantData};

