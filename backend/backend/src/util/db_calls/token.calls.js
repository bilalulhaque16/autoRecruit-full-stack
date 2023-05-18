const saveRefreshToken = (modelName, refresh_token, id) => {
    const model = new modelName({
        token: refresh_token,
        userId: id
    })
    model.save();
}

const getRefreshToken = async (modelName, filter) => {
    const model = await modelName.findOne(filter);
    return model;
}

export {saveRefreshToken, getRefreshToken};