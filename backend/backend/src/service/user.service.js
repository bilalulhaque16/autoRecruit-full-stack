import { BlobServiceClient } from "@azure/storage-blob";
import getStream from "into-stream";
import getBlobName from "../util/upload/blob_name.util.js";
import * as status_codes from "../util/status_codes.util.js";
import * as userCalls from "../util/db_calls/user.calls.js";



const getAllUsersService = async (tenantDbConnection, request) => {
  const { page, perPage } = request.query;
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 50,
    populate: [
      {
        path: "user_type_id"
      }
    ],
  };

  const User_Account = await tenantDbConnection.model('user_account');
  const foundData = await userCalls.getAllData(User_Account, {delete_status: false}, options);

  if (!foundData.totalDocs) {
    return status_codes.recordNotFound(foundData);
  } else {
    return status_codes.OK(foundData);
  }
}



const getUserService = async (tenantDbConnection, request) => {
  const User_Account = await tenantDbConnection.model('user_account');

  const foundData = await userCalls.getSpecificData(User_Account, {_id: request.params.id}, 'user_type');

  if (!foundData) {
    return status_codes.recordNotFound(foundData);
  } else {
    return status_codes.OK(foundData);
  }
}


const updateUserService = async (tenantDbConnection, request) => {
  const User_Account = await tenantDbConnection.model('user_account');
  const foundData = await userCalls.updateUserData(User_Account, {_id: request.params.id, delete_status: false}, {$set: request.body});

  if (!foundData) {
    return status_codes.recordNotFound(foundData);
  } else {
    return status_codes.OK("Updated successfully");
  }
}


const deleteUserService = async (tenantDbConnection, request) => {
  const User_Account = await tenantDbConnection.model('user_account');
  const foundData = await userCalls.updateUserData(User_Account, {_id: request.params.id, delete_status: false}, {delete_status: true});

  if (!foundData) {
    return status_codes.recordNotFound(foundData);
  } else {
    return status_codes.OK("Deleted successfully");
  }
}


const createUserService = async (tenantDbConnection, request) => {
  const User_Account = await tenantDbConnection.model('user_account');
  const User_Type = await tenantDbConnection.model('user_type');

  // const data = await userCalls.createUserForce(request, User_Type, User_Account);
  // return status_codes.recordCreated("Record created successfully")

  const user = await userCalls.getSpecificData(User_Account, {
      email: request.body.email,
    });
  if (user) return status_codes.conflict("Email already exists");

    const data = await userCalls.createUserForce(request, User_Type, User_Account);

    return status_codes.recordCreated("User created successfully")

}


const uploadProfileImageService = async (request) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_CONNECTION_STRING
  );
  const containerName = "profile";

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = getBlobName(request.file.originalname);

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const stream = getStream(request.file.buffer);
  const streamLength = request.file.buffer.length;

  const blobOptions = {
    blobHTTPHeaders: { blobContentType: request.file.mimetype },
  };
  await blockBlobClient.uploadStream(
    stream,
    streamLength,
    undefined,
    blobOptions
  );

  //   const updateUser = await updateProfile(
  //     User,
  //     { _id: request.params.id },
  //     { profileImage: blockBlobClient.url }
  //   );

  //   if (!updateUser) return status_code.OK("Profile not found");

  //   return status_code.OK("Profile image updated successfully");

  return status_codes.OK(blockBlobClient.url);
};

export { getAllUsersService, uploadProfileImageService, createUserService, getUserService, updateUserService, deleteUserService };
