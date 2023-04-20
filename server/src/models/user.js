import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    genre: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    tel: {
      type: String,
    },
    image: {
      type: String,
    },
    identificationType: {
      type: Number,
    },
    identificationNumber: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = model("User", userSchema);

export default userModel;
