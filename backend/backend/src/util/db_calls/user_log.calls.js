const createUserLogData = async (request, model) => {
    const newUserLog = new model({
        user_account_id: request._id,
        last_login_date: new Date()
    });
    newUserLog.save();
    return newUserLog
}


export {createUserLogData}