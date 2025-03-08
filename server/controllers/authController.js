import { genSalt, hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
const { sign } = jwt;
import User from "../models/User.js";

export async function register(req, res) {
  const {
    username,
    password,
    email,
    registrationNumber,
    ward,
    mobileNumber,
    sex,
    role,
    nameWithInitials,
    speciality,
    grade,
  } = req.body;

  try {
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      if (user.username === username) {
        return res.status(400).json({ msg: "Username already exists" });
      }
      if (user.email === email) {
        return res.status(400).json({ msg: "Email already exists" });
      }
    }

    user = new User({
      username,
      password,
      email,
      registrationNumber,
      ward,
      mobileNumber,
      sex,
      role,
      ...(role === "House Officer" ||
      role === "Medical Officer" ||
      role === "Consultant"
        ? { nameWithInitials, speciality }
        : {}),
      ...(role === "Nurse" ? { grade } : {}),
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
    let user = await User.findOne({ username });
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
