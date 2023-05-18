import mongoose from "mongoose";



const roleSchema = new mongoose.Schema(
    {
        role: String,
        groupRefId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "role_group"
        },
        deleteStatus: {type: Boolean, default: false}
        // permissions: Array
    }
)


// Created model from schema
const role = mongoose.model("role", roleSchema);

export default role;