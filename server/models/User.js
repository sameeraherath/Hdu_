import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["House Officer", "Medical Officer", "Nurse", "Consultant"],
    required: true,
  },
  trainingHospital: { type: String },
  specialization: { type: String },
  licenseNumber: { type: String },
  wardAssignment: { type: String },
  shiftPreference: { type: String },
  yearsOfExperience: { type: Number },
  department: { type: String },
});

export default model("User", userSchema);
