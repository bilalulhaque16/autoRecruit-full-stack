const createCompanyDetails = (model1, model2, request) => {
    const company = new model1(request.body);
    company.delete_status = false;
        
    const company_image = new model2({
        company_image: request.body.company_image
    })

    company_image.save()

    company.company_image_ref_id = company_image._id;
    company.save();
    return company
}

const getAllData = async (modelName, filter, options) => {
    const model = await modelName.paginate(filter, options);
    return model;
}

const getSpecificData = async (modelName, filter, populate_field) => {
    const model = await modelName.findOne(filter).populate(populate_field);
    return model
}

const updateCompanyData = async (modelName, filter, update) => {
    const model = await modelName.updateOne(filter, update);
    return model
}

const deleteCompanyData = async (modelName, filter, update) => {
    const model = await modelName.updateOne(filter, update);
    return model
}


const createCompanyImages = (model, data) => {
    const company = new model({
        company_image: data
    })
    company.save()
    return company
}
export {createCompanyDetails, getSpecificData, getAllData, updateCompanyData, deleteCompanyData, createCompanyImages}; 