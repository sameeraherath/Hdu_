import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { connectMySql } from "./config/mysqlDB.js";

connectMySql();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
