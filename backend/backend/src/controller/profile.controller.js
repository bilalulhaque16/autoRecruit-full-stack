// Importing services of seeker profile
import {
  readAllSeekerProfileService,
  createSeekerProfileService,
  readSeekerProfileService,
  updateSeekerProfileService,
  deleteSeekerProfileService,
  createSeekerEducationDetailsService,
  readAllSeekerEducationDetailsService,
  readSeekerEducationDetailsService,
  updateSeekerEducationDetailsService,
  deleteSeekerEducationDetailsService,
  createSeekerExperienceDetailsService,
  readAllSeekerExperienceDetailsService,
  readSeekerExperienceDetailsService,
  updateSeekerExperienceDetailsService,
  deleteSeekerExperienceDetailsService,
  createSeekerProfileVisitLogService,
  readAllSeekerProfileVisitLogService,
  readSeekerProfileVisitLogService,
  updateSeekerProfileVisitLogService,
  deleteSeekerProfileVisitLogService,
  createSeekerSkillSetService,
  readAllSeekerSkillSetService,
  readSeekerSkillSetService,
  updateSeekerSkillSetService,
  deleteSeekerSkillSetService,
  createSkillSetService,
  readAllSkillSetService,
  readSkillSetService,
  updateSkillSetService,
  deleteSkillSetService,
  createAllInOneProfileService,
  uploadCVService,
  // Seeker language
  createSeekerLanguageService,
  readAllSeekerLanguageService,
  readSeekerLanguageService,
  updateSeekerLanguageService,
  deleteSeekerLanguageService,
  createSeekerQuestionService,
  readAllSeekerQuestionService,
  readSeekerQuestionService,
  updateSeekerQuestionService,
  deleteSeekerQuestionService,
  // createSeekerSkillService,
  // getAllSeekerSkillsService
} from "../service/profile.service.js";

import { getConnection } from "../db/connectionManager.config.js";
import fs from "fs";
import { Configuration, OpenAIApi } from "openai";
import pdfUtil from "pdf-to-text";
import { BlobServiceClient } from "@azure/storage-blob";

// Seeker profile
const readAllSeekerProfileController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const allProfile = await readAllSeekerProfileService(dbConnection, req);
    res.status(allProfile.status).json(allProfile.data);
  } catch (error) {
    res.json(error);
  }
};

const createSeekerProfileController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const createProfile = await createSeekerProfileService(dbConnection, req);
    res.status(createProfile.status).json(createProfile);
  } catch (error) {
    res.json(error);
  }
};

const readSeekerProfileController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const getProfile = await readSeekerProfileService(dbConnection, req);
    res.status(getProfile.status).json(getProfile);
  } catch (error) {
    res.json(error);
  }
};

const updateSeekerProfileController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const updateProfile = await updateSeekerProfileService(dbConnection, req);
    res.status(updateProfile.status).json(updateProfile);
  } catch (error) {
    res.json(error);
  }
};

const deleteSeekerProfileController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const deleteProfile = await deleteSeekerProfileService(dbConnection, req);
    res.status(deleteProfile.status).json(deleteProfile);
  } catch (error) {
    res.json(error);
  }
};

// Seeker Education details

const createSeekerEducationDetailsController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const createEducationDetails = await createSeekerEducationDetailsService(
      dbConnection,
      req
    );
    res.status(createEducationDetails.status).json(createEducationDetails);
  } catch (error) {
    res.json(error);
  }
};

const readAllSeekerEducationDetailsController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const allProfile = await readAllSeekerEducationDetailsService(
      dbConnection,
      req
    );
    res.status(allProfile.status).json(allProfile.data);
  } catch (error) {
    res.json(error);
  }
};

const readSeekerEducationDetailsController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const getProfile = await readSeekerEducationDetailsService(
      dbConnection,
      req
    );
    res.status(getProfile.status).json(getProfile.data);
  } catch (error) {
    res.json(error);
  }
};

const updateSeekerEducationDetailsController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const updateProfile = await updateSeekerEducationDetailsService(
      dbConnection,
      req
    );
    res.status(updateProfile.status).json(updateProfile);
  } catch (error) {
    res.json(error);
  }
};

const deleteSeekerEducationDetailsController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const deleteProfile = await deleteSeekerEducationDetailsService(
      dbConnection,
      req
    );
    res.status(deleteProfile.status).json(deleteProfile);
  } catch (error) {
    res.json(error);
  }
};

// Experience details
const createSeekerExperienceDetailsController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const data = await createSeekerExperienceDetailsService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const readAllSeekerExperienceDetailsController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const data = await readAllSeekerExperienceDetailsService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const readSeekerExperienceDetailsController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const getProfile = await readSeekerExperienceDetailsService(
      dbConnection,
      req
    );
    res.status(getProfile.status).json(getProfile.data);
  } catch (error) {
    res.json(error);
  }
};

const updateSeekerExperienceDetailsController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const updateProfile = await updateSeekerExperienceDetailsService(
      dbConnection,
      req
    );
    res.status(updateProfile.status).json(updateProfile);
  } catch (error) {
    res.json(error);
  }
};

const deleteSeekerExperienceDetailsController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const deleteProfile = await deleteSeekerExperienceDetailsService(
      dbConnection,
      req
    );
    res.status(deleteProfile.status).json(deleteProfile);
  } catch (error) {
    res.json(error);
  }
};

// Seeker profile visit log
const createSeekerProfileVisitLogController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const data = await createSeekerProfileVisitLogService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const readAllSeekerProfileVisitLogController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const data = await readAllSeekerProfileVisitLogService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const readSeekerProfileVisitLogController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const getProfile = await readSeekerProfileVisitLogService(
      dbConnection,
      req
    );
    res.status(getProfile.status).json(getProfile.data);
  } catch (error) {
    res.json(error);
  }
};

const updateSeekerProfileVisitLogController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const updateProfile = await updateSeekerProfileVisitLogService(
      dbConnection,
      req
    );
    res.status(updateProfile.status).json(updateProfile);
  } catch (error) {
    res.json(error);
  }
};

const deleteSeekerProfileVisitLogController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const deleteProfile = await deleteSeekerProfileVisitLogService(
      dbConnection,
      req
    );
    res.status(deleteProfile.status).json(deleteProfile);
  } catch (error) {
    res.json(error);
  }
};

// Seeker skill set
const createSeekerSkillSetController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const data = await createSeekerSkillSetService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const readAllSeekerSkillSetController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const data = await readAllSeekerSkillSetService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const readSeekerSkillSetController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const getProfile = await readSeekerSkillSetService(dbConnection, req);
    res.status(getProfile.status).json(getProfile.data);
  } catch (error) {
    res.json(error);
  }
};

const updateSeekerSkillSetController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const updateProfile = await updateSeekerSkillSetService(dbConnection, req);
    res.status(updateProfile.status).json(updateProfile);
  } catch (error) {
    res.json(error);
  }
};

const deleteSeekerSkillSetController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const deleteProfile = await deleteSeekerSkillSetService(dbConnection, req);
    res.status(deleteProfile.status).json(deleteProfile);
  } catch (error) {
    res.json(error);
  }
};

// Seeker language
const createSeekerLanguageController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await createSeekerLanguageService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const readAllSeekerLanguageController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await readAllSeekerLanguageService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const readSeekerLanguageController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const getProfile = await readSeekerLanguageService(dbConnection, req);
    res.status(getProfile.status).json(getProfile.data);
  } catch (error) {
    res.json(error);
  }
};

const updateSeekerLanguageController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const updateProfile = await updateSeekerLanguageService(dbConnection, req);
    res.status(updateProfile.status).json(updateProfile);
  } catch (error) {
    res.json(error);
  }
};

const deleteSeekerLanguageController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const deleteProfile = await deleteSeekerLanguageService(dbConnection, req);
    res.status(deleteProfile.status).json(deleteProfile);
  } catch (error) {
    res.json(error);
  }
};

// Seeker questions
const createSeekerQuestionController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await createSeekerQuestionService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const readAllSeekerQuestionController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await readAllSeekerQuestionService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const readSeekerQuestionController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const getProfile = await readSeekerQuestionService(dbConnection, req);
    res.status(getProfile.status).json(getProfile.data);
  } catch (error) {
    res.json(error);
  }
};

const updateSeekerQuestionController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const updateProfile = await updateSeekerQuestionService(dbConnection, req);
    res.status(updateProfile.status).json(updateProfile);
  } catch (error) {
    res.json(error);
  }
};

const deleteSeekerQuestionController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const deleteProfile = await deleteSeekerQuestionService(dbConnection, req);
    res.status(deleteProfile.status).json(deleteProfile);
  } catch (error) {
    res.json(error);
  }
};

// Skill set
const createSkillSetController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const data = await createSkillSetService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const readAllSkillSetController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const data = await readAllSkillSetService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const readSkillSetController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const getProfile = await readSkillSetService(dbConnection, req);
    res.status(getProfile.status).json(getProfile.data);
  } catch (error) {
    res.json(error);
  }
};

const updateSkillSetController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const updateProfile = await updateSkillSetService(dbConnection, req);
    res.status(updateProfile.status).json(updateProfile);
  } catch (error) {
    res.json(error);
  }
};

const deleteSkillSetController = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const deleteProfile = await deleteSkillSetService(dbConnection, req);
    res.status(deleteProfile.status).json(deleteProfile);
  } catch (error) {
    res.json(error);
  }
};



// // Seeker skills
// const createSeekerSkillController = async (req, res) => {
//   try {
//     const dbConnection = getConnection();

//     const data = await createSeekerSkillService(dbConnection, req);
//     res.status(data.status).json(data);
//   } catch (error) {
//     res.json(error);
//   }
// };

// const getAllSeekerSkillsController = async (req, res) => {
//   try {
//     const dbConnection = getConnection();

//     const data = await getAllSeekerSkillsService(dbConnection, req);
//     res.status(data.status).json(data);
//   } catch (error) {
//     res.json(error);
//   }
// };

// All in one add
const createAllInOneProfileController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await createAllInOneProfileService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

// Upload Profile CV
const uploadCVController = async (req, res) => {
  try {
    const data = await uploadCVService(req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const categorizeCVWithAIController = async (req, res) => {
  const configuration = new Configuration({
    basePath:
      "https://kspazopenai.openai.azure.com/openai/deployments/ksptextdavinci",
  });
  const openai = new OpenAIApi(configuration);

  // try {
  //   // Upload on cloud
  //   const blobServiceClient = BlobServiceClient.fromConnectionString(
  //     process.env.AZURE_CONNECTION_STRING
  //   );
  //   const containerName = "cvs";
  //   const containerClient = blobServiceClient.getContainerClient(containerName);
  //   const identifier = Math.random().toString().replace(/0\./, "");
  //   const blobName = `${identifier}-${req.file.originalname}`;
  //   const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  //   const stream = fs.createReadStream(req.file.path);
  //   await blockBlobClient.uploadStream(stream);

  //   let uploadedUrl = blockBlobClient.url;

  //   // Parse from pdf
  //   const option = { from: 0, to: 10 };

  //   pdfUtil.pdfToText(
  //     `./uploads/${req.file.filename}`,
  //     option,
  //     function (err, data) {
  //       if (err) {
  //         throw err;
  //       } else {
  //         data = data.replace(/\n/g, "");
  //         // data = `${data}Cluster the above circular vita into topic categories based on patterns seen within the text. In the skills section, you have to set only keywords\n\nExample Output format:\n{\n"name": "",\n"phoneNo": "",\n"email": "",\n"address": "",\n"city": "",\n"country": "",\n"Education": [\n{\n"degreeName": "",\n"university": "",\n"year": "",\n"gpa": ""\n}],\n"experience": [\n{\n"companyName": "",\n"designation": "",\n"startDate": "",\n"endDate": ""\n}\n],\n"skills": [""],\n"projects": [\n{\n"title": "",\n"website": ""\n}\n]\n}`;
  //         // data = `${data}Cluster the above circular vita into topic categories based on patterns seen within the text. In the skills and job categories section, you have to set only keywords Example Output format:\n{\n"personal_info\": {\n \"address\": \"\",\n \"city\": \"\",\n \"country\": \"\",\n \"email\": \"\",\n \"first_name\": \"\",\n \"last_name\": \"\",\n \"links\":[\n {\n \"platform\": \"\",\n \"url\": \"\"\n }\n ],\n \"middle_name\": \"\",\n \"phone_number\": \"\",\n \"postal_code\": \"\",\n \"preferred_name\": \"\",\n \"resume_url\": \"\"\n },\n \"work_and_experience\": {\n \"education_details\": [\n {\n \"certificate_degree_name\": \"\",\n \"cgpa\": \"\",\n \"completion_date\": \"\",\n \"field_of_study\": \"\",\n \"institute_university_name\": \"\",\n \"is_percentage\": \"\",\n \"starting_date\": \"\"\n }\n ],\n \"experience_details\": [\n {\n \"company_name\": \"\",\n \"completion_date\": \"\",\n \"description\": \"\",\n \"is_current_job\": \"\",\n \"job_location_city\": \"\",\n \"job_location_country\": \"\",\n \"job_location_state\": \"\",\n \"job_title\": \"\",\n \"starting_date\": \"\"\n }\n ],\n \"job_categories\": [\n {\n \"name\": \"\"\n }\n ],\n \"seeker_languages\":[\n {\n \"fluent\": \"\",\n \"language\": \"\",\n \"reading_proficiency\": \"\",\n \"speaking_proficiency\": \"\"\n }\n ],\n \"seeker_skill_sets\": [\n {\n \"skill_level\": \"\",\n \"skill_set_id\": {\n \"skill_set_name\": \"\"\n }\n }\n ]\n }\n}\n\n\n\n`;

  //         // data = `${data}Cluster the above circular vita into topic categories based on patterns seen within the text. In the skills section you have to set only keywords Example Output format:\n{\n"personal_info\": {\n \"address\": \"\",\n \"city\": \"\",\n \"country\": \"\",\n \"email\": \"\",\n \"first_name\": \"\",\n \"last_name\": \"\",\n \"links\":[\n {\n \"platform\": \"\",\n \"url\": \"\"\n }\n ],\n \"middle_name\": \"\",\n \"phone_number\": \"\",\n \"postal_code\": \"\",\n \"preferred_name\": \"\",\n \"resume_url\": \"\"\n },\n \"work_and_experience\": {\n \"education_details\": [\n {\n \"certificate_degree_name\": \"\",\n \"cgpa\": \"\",\n \"completion_date\": \"\",\n \"field_of_study\": \"\",\n \"institute_university_name\": \"\",\n \"is_percentage\": \"\",\n \"starting_date\": \"\"\n }\n ],\n \"experience_details\": [\n {\n \"company_name\": \"\",\n \"completion_date\": \"\",\n \"description\": \"\",\n \"is_current_job\": \"\",\n \"job_location_city\": \"\",\n \"job_location_country\": \"\",\n \"job_location_state\": \"\",\n \"job_title\": \"\",\n \"starting_date\": \"\"\n }\n ],\n \"job_categories\": [""],\n \"seeker_languages\":[\n {\n \"fluent\": \"\",\n \"language\": \"\",\n \"reading_proficiency\": \"\",\n \"speaking_proficiency\": \"\"\n }\n ],\n \skills": [""]\n }\n}\n\n\n\n`;


  //         // data = `${data}Cluster the above circular vita into topic categories based on patterns seen within the text. In the skills section you have to set only keywords, set the platform name in lowercase corresponding to the url provided and remove donot include emails in links array, also convert all the dates to ISO 8601 format and the country should be in title case Example Output format:\n{\n"personal_info\": {\n \"address\": \"\",\n \"city\": \"\",\n \"country\": \"\",\n \"email\": \"\",\n \"first_name\": \"\",\n \"last_name\": \"\",\n \"links\":[\n {\n \"platform\": \"\",\n \"url\": \"\"\n }\n ],\n \"middle_name\": \"\",\n \"phone_number\": \"\",\n \"postal_code\": \"\",\n \"preferred_name\": \"\",\n \"resume_url\": \"\"\n },\n \"work_and_experience\": {\n \"education_details\": [\n {\n \"certificate_degree_name\": \"\",\n \"cgpa\": \"\",\n \"completion_date\": \"\",\n \"field_of_study\": \"\",\n \"institute_university_name\": \"\",\n \"is_percentage\": \"\",\n \"starting_date\": \"\"\n }\n ],\n \"experience_details\": [\n {\n \"company_name\": \"\",\n \"completion_date\": \"\",\n \"description\": \"\",\n \"is_current_job\": \"Boolean\",\n \"job_location_city\": \"\",\n \"job_location_country\": \"\",\n \"job_location_state\": \"\",\n \"job_title\": \"\",\n \"starting_date\": \"\"\n }\n ],\n \"job_categories\": [""],\n \"seeker_languages\":[\n {\n \"fluent\": \"\",\n \"language\": \"\",\n \"reading_proficiency\": \"\",\n \"speaking_proficiency\": \"\"\n }\n ],\n \skills": [""]\n }\n}\n\n\n\n`;
  //         data = `${data}Cluster the above circular vita into topic categories based on patterns seen within the text. In the seeker_skills inside the skill_name section you have to set only keywords, set the platform name in lowercase corresponding to the url provided and remove donot include emails in links array, also convert all the dates to ISO 8601 format and the country should be in title case Example Output format:\n{\n"personal_info\": {\n \"address\": \"\",\n \"city\": \"\",\n \"country\": \"\",\n \"email\": \"\",\n \"first_name\": \"\",\n \"last_name\": \"\",\n \"links\":[\n {\n \"platform\": \"\",\n \"url\": \"\"\n }\n ],\n \"middle_name\": \"\",\n \"phone_number\": \"\",\n \"postal_code\": \"\",\n \"preferred_name\": \"\",\n \"resume_url\": \"\"\n },\n \"work_and_experience\": {\n \"education_details\": [\n {\n \"certificate_degree_name\": \"\",\n \"cgpa\": \"\",\n \"completion_date\": \"\",\n \"field_of_study\": \"\",\n \"institute_university_name\": \"\",\n \"is_percentage\": \"\",\n \"starting_date\": \"\"\n }\n ],\n \"experience_details\": [\n {\n \"company_name\": \"\",\n \"completion_date\": \"\",\n \"description\": \"\",\n \"is_current_job\": \"Boolean\",\n \"job_location_city\": \"\",\n \"job_location_country\": \"\",\n \"job_location_state\": \"\",\n \"job_title\": \"\",\n \"starting_date\": \"\"\n }\n ],\n \"job_categories\": [""],\n \"seeker_languages\":[\n {\n \"fluent\": \"\",\n \"language\": \"\",\n \"reading_proficiency\": \"\",\n \"speaking_proficiency\": \"\"\n }\n ],\n \"seeker_skills\":[\n {\n \"skill_name\": \"\",\n \"skill_level\": \"0\"\n }\n ]\n}\n}\n\n\n\n`;



  //         // Open AI work
  //         openai
  //           .createCompletion(
  //             {
  //               model: "ksptextdavinci",
  //               prompt: data,
  //               temperature: 0,
  //               max_tokens: 1200,
  //             },
  //             {
  //               headers: {
  //                 "api-key": "28f68de86ac547f98ddf00fbb272ea63",
  //               },
  //               params: { "api-version": "2022-12-01" },
  //             }
  //           )
  //           .then((resp) => {
  //             res.json({
  //               url: uploadedUrl,
  //               categorizedData: JSON.parse(resp.data.choices[0].text),
  //             });
  //           });
  //       }
  //     }
  //   );
  // } catch (error) {
  //   if (error.response) {
  //     console.error(error.response.status, error.response.data);
  //     res.status(error.response.status).json(error.response.data);
  //   } else {
  //     console.error(`Error with OpenAI API request: ${error.message}`);
  //     res.status(500).json({
  //       error: {
  //         message: error.message,
  //       },
  //     });
  //   }
  // }


res.status(200).json({
  "url": "https://autorecruit.blob.core.windows.net/cvs/08335731336735153-Bilal%20Ul%20Haque%20(Resume).pdf",
  "categorizedData": {
      "personal_info": {
          "address": "Karachi, Sindh",
          "city": "Karachi",
          "country": "Pakistan",
          "email": "bilalulhaque16@gmail.com",
          "first_name": "Bilal",
          "last_name": "Haque",
          "links": [
              {
                  "platform": "linkedin",
                  "url": "linkedin.com/in/bilal-ul-haque/"
              },
              {
                  "platform": "github",
                  "url": "github.com/bilalulhaque"
              }
          ],
          // "links": [],
          "middle_name": "Ul",
          "phone_number": "+92 (345) 2156788",
          "postal_code": "",
          "preferred_name": "Bilal Ul Haque",
          "resume_url": "https://autorecruit.blob.core.windows.net/cvs/08335731336735153-Bilal%20Ul%20Haque%20(Resume).pdf"
      },
      "work_and_experience": {
          "education_details": [
              {
                  "certificate_degree_name": "BS (Computer Science)",
                  "cgpa": "",
                  "completion_date": "2022-01-01T00:00:00.000Z",
                  "field_of_study": "Computer Science",
                  "institute_university_name": "NED University of Engineering and Technology",
                  "is_percentage": "",
                  "starting_date": "2018-01-01T00:00:00.000Z"
              },
              {
                  "certificate_degree_name": "Intermediate (Pre Engineering)",
                  "cgpa": "",
                  "completion_date": "2018-01-01T00:00:00.000Z",
                  "field_of_study": "Pre Engineering",
                  "institute_university_name": "Jinnah Government College",
                  "is_percentage": "",
                  "starting_date": "2016-01-01T00:00:00.000Z"
              },
              {
                  "certificate_degree_name": "Matriculation",
                  "cgpa": "",
                  "completion_date": "2016-01-01T00:00:00.000Z",
                  "field_of_study": "",
                  "institute_university_name": "Ladybird Grammar School",
                  "is_percentage": "",
                  "starting_date": "2014-01-01T00:00:00.000Z"
              }
          ],
          "experience_details": [
              {
                  "company_name": "Freelancer",
                  "completion_date": "",
                  "description": "15+ prospective projects were successfully completed and delivered on time with a 5-star rating.",
                  "is_current_job": true,
                  "job_location_city": "",
                  "job_location_country": "",
                  "job_location_state": "",
                  "job_title": "Web Developer",
                  "starting_date": "2020-11-01T00:00:00.000Z"
              },
              {
                  "company_name": "NASH",
                  "completion_date": "2020-10-01T00:00:00.000Z",
                  "description": "Worked on Rest API using AJAX fetching techniques and implemented different wire-frames designs on web apps using HTML/CSS/JS",
                  "is_current_job": false,
                  "job_location_city": "",
                  "job_location_country": "",
                  "job_location_state": "",
                  "job_title": "Internee",
                  "starting_date": "2020-07-01T00:00:00.000Z"
              }
          ],
          "job_categories": [
              "Web Developer"
          ],
          "seeker_languages": [
              {
                  "fluent": "",
                  "language": "",
                  "reading_proficiency": "",
                  "speaking_proficiency": ""
              }
          ],
          // "skills": [
          //     "Python",
          //     "PHP",
          //     "Django",
          //     "Flask",
          //     "Node JS",
          //     "Windows",
          //     "Linux",
          //     "HTML",
          //     "CSS",
          //     "JavaScript",
          //     "ReactJS",
          //     "MYSQL",
          //     "SQLite",
          //     "PostgreSQL",
          //     "Docker",
          //     "GIT"
          // ]
          "seeker_skills": [
            {
                "skill_name": "UI / UX Designing",
                "skill_level": ""
            },
            {
                "skill_name": "Graphic Designing",
                "skill_level": ""
            },
            {
                "skill_name": "MySQL",
                "skill_level": ""
            }
        ]
      }
  }
})
};

export {
  readAllSeekerProfileController,
  createSeekerProfileController,
  readSeekerProfileController,
  updateSeekerProfileController,
  deleteSeekerProfileController,
  //
  readAllSeekerEducationDetailsController,
  createSeekerEducationDetailsController,
  readSeekerEducationDetailsController,
  updateSeekerEducationDetailsController,
  deleteSeekerEducationDetailsController,
  //
  createSeekerExperienceDetailsController,
  readAllSeekerExperienceDetailsController,
  readSeekerExperienceDetailsController,
  updateSeekerExperienceDetailsController,
  deleteSeekerExperienceDetailsController,
  //
  createSeekerProfileVisitLogController,
  readAllSeekerProfileVisitLogController,
  readSeekerProfileVisitLogController,
  updateSeekerProfileVisitLogController,
  deleteSeekerProfileVisitLogController,
  //
  readAllSeekerSkillSetController,
  createSeekerSkillSetController,
  readSeekerSkillSetController,
  updateSeekerSkillSetController,
  deleteSeekerSkillSetController,
  //
  createSkillSetController,
  readAllSkillSetController,
  readSkillSetController,
  updateSkillSetController,
  deleteSkillSetController,
  //
  createAllInOneProfileController,
  //
  uploadCVController,
  //
  createSeekerLanguageController,
  readAllSeekerLanguageController,
  readSeekerLanguageController,
  updateSeekerLanguageController,
  deleteSeekerLanguageController,
  //
  createSeekerQuestionController,
  readAllSeekerQuestionController,
  readSeekerQuestionController,
  updateSeekerQuestionController,
  deleteSeekerQuestionController,
  //
  categorizeCVWithAIController,

  // createSeekerSkillController,
  // getAllSeekerSkillsController
};
