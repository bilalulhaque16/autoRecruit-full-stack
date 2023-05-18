import { getConnection } from "../db/connectionManager.config.js";
import {getAllUsersService, uploadProfileImageService, createUserService, getUserService, updateUserService, deleteUserService} from "../service/user.service.js";



const getAllUsersController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await getAllUsersService(dbConnection, req);
    res.status(data.status).json(data)
  } catch (error) {
    res.json(error);
  }
};


const createUserController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await createUserService(dbConnection, req);
    res.status(data.status).json(data)
  } catch (error) {
    res.json(error);
  }
};


const getUserController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await getUserService(dbConnection, req);
    res.status(data.status).json(data)
  } catch (error) {
    res.json(error);
  }
};


const updateUserController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await updateUserService(dbConnection, req);
    res.status(data.status).json(data)
  } catch (error) {
    res.json(error);
  }
};


const deleteUserController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await deleteUserService(dbConnection, req);
    res.status(data.status).json(data)
  } catch (error) {
    res.json(error);
  }
};


const uploadProfileImageController = async (req, res) => {
  try {
    const data = await uploadProfileImageService(req);
    res.status(data.status).json(data)
  } catch (error) {
    res.json(error);
  }
};




export { getAllUsersController, uploadProfileImageController, createUserController, getUserController, updateUserController, deleteUserController };
