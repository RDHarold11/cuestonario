import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const departmentSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    userCode: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Departments",
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const Departments = mongoose.model("Departments", departmentSchema);
const User = mongoose.model("User", userSchema);
export { Departments, User };
