import express from "express";
import tenant from "./app_routes/tenant.route.js";
import main from "./app_routes/main.route.js";

import * as connectionResolver from "../middleware/connectionResolver.middleware.js";

// Mounting routes
// var router = express.Router();

// // Router load
// router.use("/tenant", connectionResolver.setAdminDb, tenant);

// router.use("/:companyName", connectionResolver.resolveTenant, main);

//

const router = (app) => {
  app.get("/", (req, res, next) => {
    res.json({ body: "Multi-tenant application" });
  });

  var apiRoutes = express.Router();

  // Router load
  apiRoutes.use("/tenant", connectionResolver.setAdminDb, tenant);

  apiRoutes.use("/:companyName", connectionResolver.resolveTenant, main);

  // If no routes matches
  apiRoutes.use((req, res, next) => {
    if (!req.route) {
      const error = new Error("No route matched");
      error.status = 404;
      res.status(error.status).json(error.message);
    }

    next();
  });

  app.use("/api/v1/", apiRoutes);
};

export default router;