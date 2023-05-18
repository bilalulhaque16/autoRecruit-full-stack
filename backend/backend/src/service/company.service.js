import {
  createCompanyDetails,
  getSpecificData,
  getAllData,
  updateCompanyData,
  deleteCompanyData,
  createCompanyImages
} from "../util/db_calls/company.calls.js";
// import company from "../model/company.model.js"
import company_image from "../model/company_image.model.js";
import * as status_codes from "../util/status_codes.util.js";
import * as filter from "../helper/filter/company.filter.js";
import companyImages from "../util/upload/company_images.util.js";

const createCompanyService = async (request) => {
  try {
    createCompanyDetails(company, company_image, request);
    return status_codes.recordCreated();
  } catch (error) {
    console.log(error);
  }
};

const getAllCompanyService = async (tenantDbConnection, request) => {
  try {
    const company = tenantDbConnection.model("company");
    const { page, perPage } = request.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(perPage) || 50,
    };

    console.log("db");
    const foundData = await getAllData(
      company,
      filter.getAllCompaniesFilter(request),
      options
    );

    if (!foundData.totalDocs) {
      return status_codes.recordNotFound(foundData);
    } else {
      return status_codes.OK(foundData);
    }
  } catch (error) {
    console.log(error);
  }
};

const getSpecificCompanyService = async (tenantDbConnection, request) => {
  try {
    const company = tenantDbConnection.model("company");
    console.log("db");
    const foundData = await getSpecificData(
      company,
      { _id: request.params.id, delete_status: false },
      "company_image_ref_id"
    );
    if (!foundData) return status_codes.recordNotFound(foundData);

    return status_codes.OK(foundData);
  } catch (error) {
    console.log(error);
  }
};

const updateSpecificCompanyService = async (tenantDbConnection, request) => {
  try {
    const company = tenantDbConnection.model("company");
    console.log("db");
    const foundData = await getSpecificData(
      company,
      { _id: request.params.id, delete_status: false },
      "company_image_ref_id"
    );
    if (!foundData) return status_codes.recordNotFound(foundData);

    await updateCompanyData(company, { _id: request.params.id }, request.body);

    return status_codes.OK("Updated successfully");
  } catch (error) {
    console.log(error);
  }
};

const deleteSpecificCompanyService = async (tenantDbConnection, request) => {
  try {
    const company = tenantDbConnection.model("company");
    console.log("db");
    const foundData = await getSpecificData(
      company,
      { _id: request.params.id, delete_status: false },
      "company_image_ref_id"
    );
    if (!foundData) return status_codes.recordNotFound(foundData);

    await deleteCompanyData(
      company,
      { _id: request.params.id },
      { delete_status: true }
    );

    return status_codes.OK("Deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

const uploadCompanyImageService = async (request) => {
  const data = await companyImages(request);
  // const company_image = await createCompanyImages(company, data);
  return status_codes.OK(data);
};
export {
  createCompanyService,
  getAllCompanyService,
  getSpecificCompanyService,
  updateSpecificCompanyService,
  deleteSpecificCompanyService,
  uploadCompanyImageService
};
