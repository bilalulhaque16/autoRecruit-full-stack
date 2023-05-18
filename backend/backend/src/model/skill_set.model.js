import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const skill_setSchema = new mongoose.Schema(
    {
        skill_set_name: String,
        delete_status: {type: Boolean, default: false}
    },
    {timestamps: true}
  );
  
skill_setSchema.plugin(mongoosePaginate);
  
  // Created model from schema
const skill_set = mongoose.model("skill_set", skill_setSchema);
  
export default skill_set;