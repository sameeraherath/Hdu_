import { genSalt, hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken"; // Import entire module as `jwt`
const { sign } = jwt; // Destructure `sign`
import User from "../models/User.js"; // Import User model

export async function register(req, res) {
  const {
    name,
    username,
    password,
    role,
    trainingHospital,
    specialization,
    licenseNumber,
    wardAssignment,
    shiftPreference,
    yearsOfExperience,
    department,
  } = req.body;
  try {
    let user = await User.findOne({ username }); // Use `User.findOne`
    if (user) return res.status(400).json({ msg: "Username already exists" });

    user = new User({
      name,
      username,
      password,
      role,
      ...(role === "House Officer" && { trainingHospital }),
      ...(role === "Medical Officer" && { specialization, licenseNumber }),
      ...(role === "Nurse" && { wardAssignment, shiftPreference }),
      ...(role === "Consultant" && { yearsOfExperience, department }),
    });

    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token, role: user.role });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username }); // Use `User.findOne`
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id, role: user.role } };
    sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token, role: user.role });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
