import {
  createCompanyService,
  getAllCompanyService,
  getSpecificCompanyService,
  updateSpecificCompanyService,
  deleteSpecificCompanyService,
  uploadCompanyImageService
} from "../service/company.service.js";
import { getConnection } from "../db/connectionManager.config.js";

const createCompanyController = async (req, res) => {
  const created_company = await createCompanyService(req);
  res.status(created_company.status).json(created_company);
};

const getAllCompanyController = async (req, res) => {
  const dbConnection = getConnection();
  const get_all_company = await getAllCompanyService(dbConnection, req);
  res.status(get_all_company.status).json(get_all_company);
};

const getSpecificCompanyController = async (req, res) => {
  const dbConnection = getConnection();
  const get_specific_company = await getSpecificCompanyService(
    dbConnection,
    req
  );
  res.status(get_specific_company.status).json(get_specific_company);
};

const updateSpecificCompanyController = async (req, res) => {
  const dbConnection = getConnection();
  const update_specific_company = await updateSpecificCompanyService(
    dbConnection,
    req
  );
  res.status(update_specific_company.status).json(update_specific_company);
};

const deleteSpecificCompanyController = async (req, res) => {
  const dbConnection = getConnection();
  const delete_specific_company = await deleteSpecificCompanyService(
    dbConnection,
    req
  );
  res.status(delete_specific_company.status).json(delete_specific_company);
};

const uploadCompanyImageController = async (req, res) => {
  const company_image = await uploadCompanyImageService(req);
  res.status(company_image.status).json(company_image);
};

export {
  createCompanyController,
  getAllCompanyController,
  getSpecificCompanyController,
  updateSpecificCompanyController,
  deleteSpecificCompanyController,
  uploadCompanyImageController
};
