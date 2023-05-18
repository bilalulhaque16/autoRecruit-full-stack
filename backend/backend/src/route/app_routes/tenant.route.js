import express from "express";

import * as tenantController from "../../controller/tenant.controller.js";
// import role_access from "./role_access.route.js";

const router = express.Router();
// Sign Up route
router
  .route("")
  .get(tenantController.getAllTenantsController)
  // .post([
  //     check('name').not().isEmpty().trim().escape(),
  //     check('email').not().isEmpty().isEmail().normalizeEmail()
  //   ], tenantController.createTenantController);
  .post(tenantController.createTenantController);

router.get(
  "/:companyName/confirmation/:token",
  tenantController.verifyAdminCompanyController
);


// router.use("/access", role_access)


export default router;

 