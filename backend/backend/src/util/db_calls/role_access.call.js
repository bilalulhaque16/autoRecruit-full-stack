const createUserRole = (modelName, request) => {
    const data = new modelName(request.body);
    data.save()
    return data
}

const getUserRole = async (modelName, filter, path1) => {
    const foundData = await modelName.findOne(filter).populate(path1)
    return foundData
}

const getAllUserRole = async (modelName, filter) => {
    const foundData = await modelName.find(filter)
    return foundData
}

const updateUserRole = async (modelName, filter, update) => {
    const data = await modelName.findOneAndUpdate(filter, update)
    return data
}


// 
const createRoleGroup = (modelName, request) => {
    const data = new modelName(request.body);
    data.save()
    return data
}

const getRoleGroup = async (modelName, filter) => {
    const foundData = await modelName.findOne(filter);
    return foundData
}

const getAllRoleGroup = async (modelName, filter) => {
    const foundData = await modelName.find(filter);
    return foundData
}
const updateRoleGroup = async (modelName, filter, update) => {
    const data = await modelName.findOneAndUpdate(filter, update)
    return data
}

export {createUserRole, getUserRole, getAllUserRole, createRoleGroup, getRoleGroup, getAllRoleGroup, updateUserRole, updateRoleGroup}