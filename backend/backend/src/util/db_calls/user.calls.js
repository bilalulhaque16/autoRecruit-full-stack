import { hashPassword } from "../../helper/hashing/password.hashing.js";




const createUserData = async (request, model1, model2) => {
    const newType = new model1({
        user_type_name: "user"
    })
    newType.save();

    const hashed_pwd = await hashPassword(request.body.password);
    const newUser = new model2({
        user_type_id: newType._id,
        full_name: request.body.full_name,
        email: request.body.email,
        password: hashed_pwd,
        date_of_birth: new Date(request.body.date_of_birth),
        gender: request.body.gender,
        contact_number: request.body.contact_number,
        sms_notification_active: false,
        email_notification_active: false,
        // user_image: request.body.user_image,
        registration_date: new Date()
    });
    newUser.save();
    return newUser
}


const createUserForce = async (request, model1, model2) => {
    const newType = new model1({
        user_type_name: "user"
    })
    newType.save();

    const hashed_pwd = await hashPassword(request.body.password);
    const newUser = new model2({
        user_type_id: newType._id,
        full_name: request.body.full_name,
        email: request.body.email,
        password: hashed_pwd,
        date_of_birth: new Date(request.body.date_of_birth),
        gender: request.body.gender,
        contact_number: request.body.contact_number,
        sms_notification_active: false,
        email_notification_active: false,
        // user_image: request.body.user_image,
        registration_date: new Date(),
        is_active: true
    });
    newUser.save();
    return newUser
}

const getAllData = async (modelName, filter, options) => {
    const model = await modelName.paginate(filter, options);
    return model;
}

const getSpecificData = async (modelName, filter, populateField) => {
    const model = await modelName.findOne(filter).populate(populateField);
    return model
}

const getUserData = async (modelName, filter) => {
    const model = await modelName.findOne(filter);
    return model
}

const updateUserData = async (modelName, filter, update) => {
    const model = await modelName.updateOne(filter, update);
    return model
}
export {createUserData, getAllData, getSpecificData, getUserData, updateUserData, createUserForce};