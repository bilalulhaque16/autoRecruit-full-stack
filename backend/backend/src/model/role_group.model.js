import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: String,
  modules: [
    {
      module_name: String,
      module_path: String,
      permissions: {
        create: { type: Boolean, default: false },
        view: { type: Boolean, default: true },
        update: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        export: { type: Boolean, default: false },
        print: { type: Boolean, default: false },
      
      },
    },
  ],
  deleteStatus: { type: Boolean, default: false },
});

// Created model from schema
const role_group = mongoose.model("role_group", groupSchema);

export default role_group;