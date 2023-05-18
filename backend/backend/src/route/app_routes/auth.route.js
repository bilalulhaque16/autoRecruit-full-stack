import express from "express";
import * as authController from "../../controller/auth.controller.js";

const router = express.Router();


router.route("/signup")
    .post(authController.createUserController);


router.route("/signin")
    .post(authController.loginUserController)

router.route("/create-token")
    .post(authController.createAccessTokenController)

router.route("/verifyOTP")
    .post(authController.verifyOTPController);

router.route("/verifyOTP/:token")
    .get(authController.verifyOTPViaLinkController);

router.route("/resendOTP")
    .post(authController.resendOTPController);

router.route("/forgot-password")
    .post(authController.postForgotPwdController);


router.route("/reset-password/:token")
    .get(authController.getResetPwdController)
    .post(authController.postResetPwdController);

export default router;


