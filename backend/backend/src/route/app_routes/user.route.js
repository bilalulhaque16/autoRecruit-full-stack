import express from "express";
import imageUpload from "../../util/upload/image.upload.js";
import * as userController from "../../controller/user.controller.js";
import { getConnection } from "../../db/connectionManager.config.js";

const router = express.Router();

// router.route("/uploadProfileImage")
// .post(async (req, res, next) => {
//     const dbConnection =  await getConnection();
//     const User = await dbConnection.model("user_account");
//     req.userModel = User;
//     next();

//   }, imageUpload.single('profileImage'), userController.uploadProfileImageController)


router.route("")
    .get(userController.getAllUsersController)
    .post(userController.createUserController)


router.route("/specific/:id")
    .get(userController.getUserController)
    .patch(userController.updateUserController)
    .delete(userController.deleteUserController)


router.route("/uploadProfileImage")
.post(imageUpload.single('profileImage'), userController.uploadProfileImageController)


export default router;


