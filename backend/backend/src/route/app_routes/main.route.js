import express from "express";


// Importing other routes from external files
import auth from "./auth.route.js"
import company from "./company.route.js";
import job from "./job.route.js";
import seeker_profile from "./profile.route.js";
import user from "./user.route.js";

// Importing middleware
import authenticateToken from "../../middleware/authenticate.middleware.js";
import oAuth from "../../middleware/oAuth.middleware.js";


const router = express.Router();

router.get('', (req, res) => {
    res.send("This is the welcome page of Company")
})
router.use("/auth", auth)
router.use("/user", user)
router.use("/seeker_profile", oAuth, seeker_profile)
router.use("/company", oAuth, company)
router.use("/job", oAuth, job)

export default router;