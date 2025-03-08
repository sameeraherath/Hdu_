import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  registrationNumber: { type: String, required: true },
  ward: { type: String },
  mobileNumber: { type: String, required: true },
  sex: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  role: {
    type: String,
    enum: ["House Officer", "Medical Officer", "Nurse", "Consultant"],
    required: true,
  },
  nameWithInitials: { type: String },
  speciality: { type: String },
  grade: { type: String },
});

export default model("User", userSchema);
