import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,      // ✅ capital S
      required: true,
      unique: true,
    },
    name: {
      type: String,      // ✅ capital S
      required: true,
    },
    image: {
      type: String,      // ✅ capital S
      required: true,
    },
    clerkId: {
      type: String,      // ✅ capital S
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

 const User = mongoose.model("User", userSchema);
export default User;
