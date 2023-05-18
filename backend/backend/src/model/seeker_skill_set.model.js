import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const seeker_skill_setSchema = new mongoose.Schema(
    {
        seeker_profile_id: {type: mongoose.Schema.Types.ObjectId, ref: "seeker_profile"},
        skill_set_id: {type: mongoose.Schema.Types.ObjectId, ref: "skill_set"},
        skill_level: Number,
        delete_status: {type: Boolean, default: false}
    },
    {timestamps: true}
  );
  
seeker_skill_setSchema.plugin(mongoosePaginate);
  
  // Created model from schema
const seeker_skill_set = mongoose.model("seeker_skill_set", seeker_skill_setSchema);
  
export default seeker_skill_set;