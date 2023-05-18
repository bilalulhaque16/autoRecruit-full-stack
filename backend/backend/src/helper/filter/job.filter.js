import { ObjectId } from "mongodb";
import ROLES from "../../util/roles_list.util.js";

function getAllJobs(request){
    let filter = {};
    if(request.user.role != ROLES.Admin){
        // filter.publish_status = 'publish'
        filter.delete_status = false
    }

    if ('job_title' in request.query) filter.job_title = request.query.job_title
    if ('job_type' in request.query) filter.job_type = request.query.job_type
    if ('experience' in request.query) filter.experience = request.query.experience

    return filter;
}


function getAllCategorizedJobs(request){
    let filter = {};
    if ('job_category' in request.query) {
        filter.job_category = request.query.job_category.split(",");
    }
    return filter;
}


function getAllAppliedJobs(request){
    // let filter = request.query;
    // if('page' in filter) delete filter.page
    // if('perPage' in filter) delete filter.perPage

    let filter = {};
    if(request.user.role !== ROLES.Admin){
        filter.seeker_profile_id = ObjectId(request.user.seeker_profile_id)
    }
    return filter;
}


function getFilteredAppliedJobs(request){
    let filter = {};
    if (request.query.fullName) {
        var reg = new RegExp(request.query.fullName, "i");
        // filter['seeker_profile_id.personal_info.full_name'] = { $regex: reg };
        filter['seeker_profile_id.personal_info.first_name'] = { $regex: reg };
    }
    if (request.query.jobTitle) {
        filter['job_post_id.job_title'] = request.query.jobTitle
    }

    console.log(filter)
    return filter;
}

export {getAllJobs, getAllAppliedJobs, getAllCategorizedJobs, getFilteredAppliedJobs}