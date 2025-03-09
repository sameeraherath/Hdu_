import { connect } from "mongoose";
import { config } from "dotenv";

config();

const connectMongoDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export { connectMongoDB };


