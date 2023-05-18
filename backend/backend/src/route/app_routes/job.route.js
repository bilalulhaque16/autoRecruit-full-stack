import express from "express";
import * as jobController from "../../controller/job.controller.js";

const router = express.Router();

router.route("/job_location")
    .get(jobController.getJobLocationController)
    .post(jobController.createJobLocationController);

router.route("/job_location/:id")
    .get(jobController.getSpecificJobLocationController)
    .patch(jobController.updateSpecificJobLocationController)
    .delete(jobController.deleteSpecificJobLocationController);


router.route("/job_post")
    .get(jobController.getJobPostController)
    .post(jobController.createJobPostController);

router.route("/job_post/:id")
    .get(jobController.getSpecificJobPostController)
    .patch(jobController.updateSpecificJobPostController)
    .delete(jobController.deleteSpecificJobPostController)


router.route("/job_category")
    .get(jobController.getJobCategoryController)
    .post(jobController.createJobCategoryController);

router.route("/job_category/:id")
    .get(jobController.getSpecificJobCategoryController)
    .patch(jobController.updateSpecificJobCategoryController)
    .delete(jobController.deleteSpecificJobCategoryController);


router.route("/job_post_activity")
    .get(jobController.getJobPostActivityController)
    .post(jobController.createJobPostActivityController);

router.route("/job_post_activity/:id")
    .get(jobController.getSpecificJobPostActivityController)
    .patch(jobController.updateSpecificJobPostActivityController)
    .delete(jobController.deleteSpecificJobPostActivityController)


    
router.route("/job_interview_level")
    .get(jobController.getJobInterviewLevelController)
    .post(jobController.createJobInterviewLevelController);

router.route("/job_interview_level/:id")
    .get(jobController.getSpecificJobInterviewLevelController)
    .patch(jobController.updateSpecificJobInterviewLevelController)
    .delete(jobController.deleteSpecificJobInterviewLevelController)

    
router.route("/job_invitation")
    .get(jobController.getJobInvitationController)
    .post(jobController.createJobInvitationController);

router.route("/job_invitation/:id")
    .get(jobController.getSpecificJobInvitationController)
    .patch(jobController.updateSpecificJobInvitationController)
    .delete(jobController.deleteSpecificJobInvitationController)









// router.route("/appliedJobs")
//     .get(jobController.getAppliedJobsController)


// router.route("/job_post_skill_set")
//     .get(jobController.getJobPostSkillSetController)
//     .post(jobController.createJobPostSkillSetController);

// router.route("/job_post_skill_set/:id")
//     .get(jobController.getSpecificJobPostSkillSetController)
//     .patch(jobController.updateSpecificJobPostSkillSetController)
//     .delete(jobController.deleteSpecificJobPostSkillSetController)


// router.route("/job_post_action")
//     .get(jobController.getJobPostActionController)
//     .post(jobController.createJobPostActionController);

// router.route("/job_post_action/:id")
//     .get(jobController.getSpecificJobPostActionController)
//     .patch(jobController.updateSpecificJobPostActionController)
//     .delete(jobController.deleteSpecificJobPostActionController)


// router.route("/job_application_status")
//     .get(jobController.getJobApplicationStatusController)
//     .post(jobController.createJobApplicationStatusController);

// router.route("/job_application_status/:id")
//     .get(jobController.getSpecificJobApplicationStatusController)
//     .patch(jobController.updateSpecificJobApplicationStatusController)
//     .delete(jobController.deleteSpecificJobApplicationStatusController)



// router.route("/job_post_activity_log")
//     .get(jobController.getJobPostActivityLogController)
//     .post(jobController.createJobPostActivityLogController);

// router.route("/job_post_activity_log/:id")
//     .get(jobController.getSpecificJobPostActivityLogController)
//     .patch(jobController.updateSpecificJobPostActivityLogController)
//     .delete(jobController.deleteSpecificJobPostActivityLogController)

export default router;