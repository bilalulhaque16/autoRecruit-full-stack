import mongoose from 'mongoose';

// Create a schema with the Mixed type
const questionSchema = new mongoose.Schema({
  seeker_profile_id: {type: mongoose.Schema.Types.ObjectId, ref: "seeker_profile"},
  ques: String,
  ans: String,
  delete_status: {type: Boolean, default: false}
});

// Create a model
const seeker_question = mongoose.model('seeker_question', questionSchema);

export default seeker_question;