import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requred: true,
    },
    email: {
      type: String,
      requred: true,
    },
    password: {
      type: String,
      requred: true,
    },
    resetTokenExpiration: {
      type: Date,
    },
    resetToken: {
      type: String,
      required:false
    },
    role: { type: String, default: "USER" },
  },
  { timestamps: true }
);

 const userModel = mongoose.model("user", userSchema);
export default userModel

