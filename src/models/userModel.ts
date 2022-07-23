import mongoose from "mongoose";
import { platformDataSchema, platformDataInterface } from "./platformDataModel";
import bcrypt from "bcrypt";

interface userInterface {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  refreshToken?: string;
  platformData: {
    leetcode?: platformDataInterface;
    codeforces?: platformDataInterface;
    atcoder?: platformDataInterface;
    gfg?: platformDataInterface;
    spoj?: platformDataInterface;
    hackerrank?: platformDataInterface;
    hackerearth?: platformDataInterface;
    codechef?: platformDataInterface;
  };
}

const userSchema = new mongoose.Schema<userInterface>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: "",
  },
  password: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  platformData: {
    type: {
      leetcode: platformDataSchema,
      codeforces: platformDataSchema,
      atcoder: platformDataSchema,
      gfg: platformDataSchema,
      spoj: platformDataSchema,
      hackerrank: platformDataSchema,
      hackerearth: platformDataSchema,
      codechef: platformDataSchema,
    },
    required: true,
    default: {}
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    if (this.password) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    }
  } catch (err: any) {
    err = new Error("Error hashing or storing password");
    next(err);
  }
});

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("users", userSchema);
