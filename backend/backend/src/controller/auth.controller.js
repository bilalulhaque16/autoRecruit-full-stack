import {
  createUserService,
  getAllUserService,
  loginUserService,
  createAccessTokenService,
  verifyOTPService,
  resendOTPService,
  postForgotPwdService,
  getResetPwdService,
  postResetPwdService,
  verifyOTPViaLinkService
} from "../service/auth.service.js";

import { getConnection } from "../db/connectionManager.config.js";


const createUserController = async (req, res) => {
  const dbConnection = getConnection();
  const createUser = await createUserService(dbConnection, req);
  res.status(createUser.status).json(createUser);
};
const getAllUserController = async (req, res) => {
  const dbConnection = getConnection();
  const allUsersData = await getAllUserService(dbConnection, req);
  res.status(allUsersData.status).json(allUsersData.data);
};

const loginUserController = async (req, res) => {
  const dbConnection = getConnection();
  const logged_in = await loginUserService(dbConnection, req);
  res.status(logged_in.status).json(logged_in);
};

const createAccessTokenController = async (req, res) => {
  const dbConnection = getConnection();
  const access_token = await createAccessTokenService(dbConnection, req);
  res.status(access_token.status).json(access_token);
};

const verifyOTPController = async (req, res) => {
  const dbConnection = getConnection();
  const verifyOTP = await verifyOTPService(dbConnection, req);
  res.status(verifyOTP.status).json(verifyOTP);
  // console.log(verifyOTP)
};


const verifyOTPViaLinkController = async (req, res) => {
  const dbConnection = getConnection();
  const verifyOTP = await verifyOTPViaLinkService(dbConnection, req);
  res.status(verifyOTP.status).json(verifyOTP);
};

const resendOTPController = async (req, res) => {
  const dbConnection = getConnection();
  const resendOTP = await resendOTPService(dbConnection, req);
  res.status(resendOTP.status).json(resendOTP);
};

const postForgotPwdController = async (req, res) => {
  const dbConnection = getConnection();
  const forgotPwd = await postForgotPwdService(dbConnection, req);
  res.status(forgotPwd.status).json(forgotPwd)
};
  
const getResetPwdController = async (req, res) => {
  const dbConnection = getConnection();
  const resetPwd = await getResetPwdService(dbConnection, req);
  res.status(resetPwd.status).json(resetPwd)
}

const postResetPwdController = async (req, res) => {
  const dbConnection = getConnection();
  const resetPwd = await postResetPwdService(dbConnection, req);
  res.status(resetPwd.status).json(resetPwd)
}

export {
  getAllUserController,
  createUserController,
  loginUserController,
  createAccessTokenController,
  verifyOTPController,
  resendOTPController,
  postForgotPwdController,
  getResetPwdController,
  postResetPwdController,
  verifyOTPViaLinkController
};
