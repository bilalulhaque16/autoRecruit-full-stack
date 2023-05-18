import express from "express";
import * as companyController from "../../controller/company.controller.js";
import imageUpload from "../../util/upload/image.upload.js";

const router = express.Router();

router.route("")
    .get(companyController.getAllCompanyController)    
    // .post(companyController.createCompanyController);

router.route("/specific/:id")
    .get(companyController.getSpecificCompanyController)
    .patch(companyController.updateSpecificCompanyController)    
    .delete(companyController.deleteSpecificCompanyController)

router.route("/upload")
    .post(imageUpload.array('companyImage'), companyController.uploadCompanyImageController)

export default router;