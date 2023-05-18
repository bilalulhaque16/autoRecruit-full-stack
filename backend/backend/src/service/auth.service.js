import {
  createUserData,
  getAllData,
  getSpecificData,
  getUserData,
  updateUserData,
} from "../util/db_calls/user.calls.js";
import {
  hashPassword,
  compareHashPassword,
} from "../helper/hashing/password.hashing.js";
import * as status_codes from "../util/status_codes.util.js";
import * as filter from "../helper/filter/auth.filter.js";
import jwt from "jsonwebtoken";
import generateAccessToken from "../util/tokens/generate_access.token.js";
import {
  saveRefreshToken,
  getRefreshToken,
} from "../util/db_calls/token.calls.js";
import createNewAccessToken from "../util/tokens/create_access.token.js";
import sendOTPVerificationEmail from "../util/otp/send_otp.otp.js";
import { findUserOTP, deleteOTP } from "../util/db_calls/otp.calls.js";
import sendResetPwdEmail from "../util/reset_pwd/reset_mail.pwd.js";
import { createUserLogData } from "../util/db_calls/user_log.calls.js";
import ROLES from "../util/roles_list.util.js";

import * as profileCall from "../util/db_calls/profile.calls.js";

const createUserService = async (tenantDbConnection, request) => {
  try {
    const User_Account = await tenantDbConnection.model("user_account");
    const User_Type = await tenantDbConnection.model("user_type");
    const User_Otp = await tenantDbConnection.model("user_otp");

    const user = await getSpecificData(User_Account, {
      email: request.body.email,
    });
    if (user) return status_codes.conflict("Email already exists");

    const created_user = await createUserData(request, User_Type, User_Account);

    const secret = process.env.ACCESS_TOKEN_SECRET;
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      email: created_user.email,
      _id: created_user._id,
      otp: otp,
    };

    const url = request.protocol + "://" + request.get("host");
    const token = jwt.sign(payload, secret, { expiresIn: "10m" });
    const link = `${url}/api/v1/${request.tenantName}/auth/verifyOTP/${token}`;

    // const link = `http://172.16.8.129:3000/${request.tenantName}/reset-password/${token}`;
    //

    await sendOTPVerificationEmail(User_Otp, payload, link);

    return status_codes.OK({
      status: "PENDING",
      message: "Verification otp email sent",
      email: created_user.email,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUserService = async (tenantDbConnection, request) => {
  try {
    const User_Account = await tenantDbConnection.model("user_account");
    const { page, perPage } = request.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(perPage) || 50,
    };

    console.log("db");
    console.log(request.query);
    const foundData = await getAllData(
      User_Account,
      filter.getAllUsersFilter(request),
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

const loginUserService = async (tenantDbConnection, request) => {
  try {
    const User_Account = await tenantDbConnection.model("user_account");
    const Refresh_Tokens = await tenantDbConnection.model("refresh_tokens");
    const User_Log = await tenantDbConnection.model("user_log");
    const Seeker_Profile = await tenantDbConnection.model("seeker_profile");

    let seeker_profile_data;

    const { email, password } = request.body;
    const user = await getSpecificData(
      User_Account,
      { email: email },
      "user_type_id"
    );

    if (!user) return status_codes.recordNotFound(user);

    if (!user.is_active)
      return status_codes.unauthorized("User is unauthorized");

    const matched_pwd = await compareHashPassword(password, user.password);

    if (!matched_pwd) return status_codes.unauthorized("Invalid password");

    if (
      user.user_type_id.user_type_name === ROLES.User &&
      user.seeker_profile_id != ""
    ) {
      //
      seeker_profile_data = await Seeker_Profile.findOne({
        _id: user.seeker_profile_id,
      })
        .populate([
          {
            path: "user_account_id",
            select: "-_id full_name email date_of_birth gender contact_number",
          },
          {
            path: "work_and_experience.job_categories",
            select: "name",
            
          },
        ])
        .select(
          "work_and_experience.job_categories"
        );

      //
      var user_payload = {
        user_name: user.full_name,
        email: user.email,
        id: user._id,
        role: user.user_type_id.user_type_name,
        seeker_profile_id: user.seeker_profile_id,
      };
    } else {
      var user_payload = {
        email: user.email,
        id: user._id,
        role: user.user_type_id.user_type_name,
      };
    }
    const refresh_token = jwt.sign(
      user_payload,
      process.env.REFRESH_TOKEN_SECRET
    );
    const access_token = generateAccessToken(user_payload);

    saveRefreshToken(Refresh_Tokens, refresh_token, user._id);

    await createUserLogData(user, User_Log);

    return status_codes.OK({
      accessToken: access_token,
      refreshToken: refresh_token,
      seeker_profile_credentials: seeker_profile_data,
    });
  } catch (error) {
    console.log(error);
  }
};

const createAccessTokenService = async (tenantDbConnection, request) => {
  try {
    const refresh_token = request.headers.refresh_token;
    const Refresh_Tokens = await tenantDbConnection.model("refresh_tokens");

    if (refresh_token == null) {
      return status_codes.unauthorized("Invalid token");
    }

    const found_token = await getRefreshToken(Refresh_Tokens, {
      token: refresh_token,
    });
    if (!found_token)
      return status_codes.recordNotFound("Refresh token not found");

    return status_codes.OK(createNewAccessToken(refresh_token));
  } catch (error) {
    console.log(error);
  }
};

const verifyOTPService = async (tenantDbConnection, request) => {
  try {
    let { email, otp } = request.body;
    const User_Account = await tenantDbConnection.model("user_account");
    const User_Otp = await tenantDbConnection.model("user_otp");

    const userRecord = await getUserData(User_Account, { email: email });

    if (!userRecord) return status_codes.recordNotFound(userRecord);

    const verified_user = userRecord.is_active;

    if (verified_user) return status_codes.OK("User verified already");

    const user_otp_record = await findUserOTP(User_Otp, {
      userId: userRecord._id,
    });
    const { expiresAt } = user_otp_record;

    if (expiresAt < Date.now()) {
      deleteOTP(User_Otp, { userId: userRecord._id });
      return status_codes.unauthorized(
        "Code has expired. Please request again"
      );
    }

    if (otp != user_otp_record.otp)
      return status_codes.unauthorized("Invalid otp passed");

    await updateUserData(User_Account, { email: email }, { is_active: true });
    deleteOTP(User_Otp, { userId: userRecord._id });

    return status_codes.OK("User verified successfully");
  } catch (error) {
    return status_codes.unauthorized(error.message);
  }
};

const verifyOTPViaLinkService = async (tenantDbConnection, request) => {
  try {
    // New work
    const User_Account = await tenantDbConnection.model("user_account");
    const User_Otp = await tenantDbConnection.model("user_otp");

    const { token } = request.params;
    const secret = process.env.ACCESS_TOKEN_SECRET;

    const payload = jwt.verify(token, secret);
    if (payload) {
      //
      const userRecord = await getUserData(User_Account, {
        email: payload.email,
      });

      if (!userRecord) return status_codes.recordNotFound(userRecord);

      const verified_user = userRecord.is_active;

      if (verified_user) return status_codes.OK("User verified already");

      const user_otp_record = await findUserOTP(User_Otp, {
        userId: userRecord._id,
      });

      const { expiresAt } = user_otp_record;

      if (expiresAt < Date.now()) {
        deleteOTP(User_Otp, { userId: userRecord._id });
        return status_codes.unauthorized(
          "Code has expired. Please request again"
        );
      }

      if (payload.otp != user_otp_record.otp)
        return status_codes.unauthorized("Invalid otp passed");

      await updateUserData(
        User_Account,
        { email: payload.email },
        { is_active: true }
      );
      deleteOTP(User_Otp, { userId: userRecord._id });

      return status_codes.OK("User verified successfully");

      //
    } else {
      return status_codes.unauthorized("Invalid token");
    }
  } catch (error) {
    return status_codes.unauthorized(error.message);
  }
};

const resendOTPService = async (tenantDbConnection, request) => {
  try {
    const { email } = request.body;
    const User_Account = await tenantDbConnection.model("user_account");
    const User_Otp = await tenantDbConnection.model("user_otp");
    const userRecord = await getUserData(User_Account, { email: email });
    if (!userRecord) return status_codes.recordNotFound(userRecord);

    const verified_user = userRecord.is_active;
    if (verified_user) return status_codes.OK("User verified already");

    deleteOTP(User_Otp, { userId: userRecord._id });
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      email: userRecord.email,
      _id: userRecord._id,
      otp: otp,
    };

    const url = request.protocol + "://" + request.get("host");
    const token = jwt.sign(payload, secret, { expiresIn: "10m" });
    const link = `${url}/api/v1/${request.tenantName}/auth/verifyOTP/${token}`;

    await sendOTPVerificationEmail(User_Otp, payload, link);

    return status_codes.OK({
      status: "PENDING",
      message: "Resend otp email sent",
      email: email,
    });
  } catch (error) {
    console.log(error);
  }
};

const postForgotPwdService = async (tenantDbConnection, request) => {
  try {
    const { email } = request.body;
    const User_Account = await tenantDbConnection.model("user_account");
    const userRecord = await getUserData(User_Account, { email: email });
    if (!userRecord) return status_codes.recordNotFound(userRecord);

    // const secret = process.env.ACCESS_TOKEN_SECRET + userRecord.password;
    const secret = process.env.ACCESS_TOKEN_SECRET;

    const payload = {
      email: userRecord.email,
      id: userRecord._id,
    };

    const url = request.protocol + "://" + request.get("host");
    const token = jwt.sign(payload, secret, { expiresIn: "10m" });
    // const link = `${url}/api/v1/${request.tenantName}/auth/reset-password/${userRecord._id}/${token}`;

    const link = `http://172.16.8.129:3000/${request.tenantName}/reset-password/${token}`;

    await sendResetPwdEmail(email, link);

    return status_codes.OK(`Reset pwd email sent to ${email}`);
  } catch (error) {
    console.log(error);
  }
};

const getResetPwdService = async (tenantDbConnection, request) => {
  try {
    // const { token } = request.params;
    // const User_Account = await tenantDbConnection.model("user_account");

    // const userRecord = await getUserData(User_Account, { id });
    // if (!userRecord) return status_codes.recordNotFound(userRecord);

    // const secret = process.env.ACCESS_TOKEN_SECRET + userRecord.password;

    // const payload = jwt.verify(token, secret);
    // console.log("GET payload =====>", payload);

    // return status_codes.OK({
    //   email: userRecord.email,
    //   message: "Enter your new pwd in reset pwd post route",
    // });

    // New work
    const { token } = request.params;
    const secret = process.env.ACCESS_TOKEN_SECRET;

    const payload = jwt.verify(token, secret);
    if (payload) {
      return status_codes.OK("Verified. Go to post route");
    } else {
      return status_codes.unauthorized("Invalid token");
    }
  } catch (error) {
    return status_codes.unauthorized(error.message);
  }
};

const postResetPwdService = async (tenantDbConnection, request) => {
  try {
    // const { id, token } = request.params;
    // const { password } = request.body;
    // const User_Account = await tenantDbConnection.model("user_account");

    // const userRecord = await getUserData(User_Account, { id });
    // if (!userRecord) return status_codes.recordNotFound(userRecord);

    // const secret = process.env.ACCESS_TOKEN_SECRET + userRecord.password;
    // const payload = jwt.verify(token, secret);

    // const hashed_pwd = await hashPassword(password);

    // await updateUserData(User_Account, { id }, { password: hashed_pwd });

    // return status_codes.OK("Password updated successfully");

    const { token } = request.params;
    const { password } = request.body;
    const User_Account = await tenantDbConnection.model("user_account");

    const secret = process.env.ACCESS_TOKEN_SECRET;
    const payload = jwt.verify(token, secret);

    if (payload) {
      const hashed_pwd = await hashPassword(password);
      await updateUserData(
        User_Account,
        { _id: payload.id },
        { password: hashed_pwd }
      );
      return status_codes.OK("Password updated successfully");
    } else {
      return status_codes.unauthorized("Invalid token");
    }
  } catch (error) {
    return status_codes.unauthorized(error.message);
  }
};

export {
  createUserService,
  getAllUserService,
  loginUserService,
  createAccessTokenService,
  verifyOTPService,
  resendOTPService,
  postForgotPwdService,
  getResetPwdService,
  postResetPwdService,
  verifyOTPViaLinkService,
};
