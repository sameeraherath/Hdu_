import { genSalt, hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/userRepository.js";

const { sign } = jwt;

export async function register(req, res) {
  console.log("🚀 ~ register ~ req:", req.body)
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
    let user = await UserRepository.findByUsername(username);
    console.log("🚀 ~ register ~ user:", user)
    if (user) return res.status(400).json({ msg: "Username already exists" });

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    user = await UserRepository.createUser({
      username,
      password: hashedPassword,
      email,
      registrationNumber,
      ward,
      mobileNumber,
      sex,
      role,
      nameWithInitials,
      speciality,
      grade,
    });

    const payload = { user: { id: user.id, role: user.role } };

    sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token, role: user.role });
    });
  } catch (err) {
    console.log("🚀 ~ register ~ err:", err)
    console.error(err);
    res.status(500).send("Server error");
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    let user = await UserRepository.findByUsername(username);
    console.log("🚀 ~ login ~ user:", user)
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await compare(password, user.password);
    console.log("🚀 ~ login ~ isMatch:", isMatch)
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
