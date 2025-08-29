import { ENV } from "./env.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Successfully connected with database");
  } catch (error) {
    console.log("Error connecting database", error);
    process.exit(1);
  }
};

export default connectDB;
