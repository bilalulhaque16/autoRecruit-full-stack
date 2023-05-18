import express from "express";
import * as profileController from "../../controller/profile.controller.js";
import {cvUpload, aiCvUpload} from "../../util/upload/cv.upload.js";

const router = express.Router();


// Routes used by thr user
// Profile routes
router
  .route("/profile")
  .get(profileController.readAllSeekerProfileController)
  .post(profileController.createSeekerProfileController);

router
  .route("/profile/:id")
  .get(profileController.readSeekerProfileController)
  .patch(profileController.updateSeekerProfileController)
  .delete(profileController.deleteSeekerProfileController);

// Education details routes
router
  .route("/education_details")
  .get(profileController.readAllSeekerEducationDetailsController)
  .post(profileController.createSeekerEducationDetailsController);

router
  .route("/education_details/:id")
  .get(profileController.readSeekerEducationDetailsController)
  .patch(profileController.updateSeekerEducationDetailsController)
  .delete(profileController.deleteSeekerEducationDetailsController);

// Experience details routes
router
  .route("/experience_details")
  .get(profileController.readAllSeekerExperienceDetailsController)
  .post(profileController.createSeekerExperienceDetailsController);

router
  .route("/experience_details/:id")
  .get(profileController.readSeekerExperienceDetailsController)
  .patch(profileController.updateSeekerExperienceDetailsController)
  .delete(profileController.deleteSeekerExperienceDetailsController);

// Seeker skills routes
router
  .route("/seeker_skill_set")
  .get(profileController.readAllSeekerSkillSetController)
  .post(profileController.createSeekerSkillSetController);

router
  .route("/seeker_skill_set/:id")
  .get(profileController.readSeekerSkillSetController)
  .patch(profileController.updateSeekerSkillSetController)
  .delete(profileController.deleteSeekerSkillSetController);

// Seeker languages routes
router
  .route("/seeker_languages")
  .get(profileController.readAllSeekerLanguageController)
  .post(profileController.createSeekerLanguageController);

router
  .route("/seeker_languages/:id")
  .get(profileController.readSeekerLanguageController)
  .patch(profileController.updateSeekerLanguageController)
  .delete(profileController.deleteSeekerLanguageController);



// Seeker question routes
router
  .route("/seeker_questions")
  .get(profileController.readAllSeekerQuestionController)
  .post(profileController.createSeekerQuestionController);

router
  .route("/seeker_questions/:id")
  .get(profileController.readSeekerQuestionController)
  .patch(profileController.updateSeekerQuestionController)
  .delete(profileController.deleteSeekerQuestionController);

// Create whole profile route
router
  .route("/create_whole_profile")
  .post(profileController.createAllInOneProfileController);

// Upload cv routes
router
  .route("/upload_cv")
  .post(cvUpload.single("cv"), profileController.uploadCVController);

router.route("/categorize_cv_with_ai")
  .post(aiCvUpload.single("cv"), profileController.categorizeCVWithAIController)



// Routes used by thr admin
// Skills route
router
  .route("/skill_set")
  .get(profileController.readAllSkillSetController)
  .post(profileController.createSkillSetController);

router
  .route("/skill_set/:id")
  .get(profileController.readSkillSetController)
  .patch(profileController.updateSkillSetController)
  .delete(profileController.deleteSkillSetController);


// Profile visit log route
router
  .route("/profile_visit_log")
  .get(profileController.readAllSeekerProfileVisitLogController)
  .post(profileController.createSeekerProfileVisitLogController);

router
  .route("/profile_visit_log/:id")
  .get(profileController.readSeekerProfileVisitLogController)
  .patch(profileController.updateSeekerProfileVisitLogController)
  .delete(profileController.deleteSeekerProfileVisitLogController);

export default router;
