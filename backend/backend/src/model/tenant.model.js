import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    full_name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    company_name: {
      type: String
    },
    dbURI: {
      type: String,
      trim: true
    },
    verified: Boolean
    
  },
    {timestamps: true}
);

// tenantSchema.index({
//   tenantId: 1
// });

const tenant = mongoose.model("tenant", tenantSchema);


export default tenant;