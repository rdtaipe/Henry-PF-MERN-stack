import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    fullName: {type: String,},
    email: {type: String,required: true },
    password: {type: String,},
    genre: {type: String,},
    country: {type: String,},
    address: {type: String,},
    name: { type: String, required: true }, 
    sub: { type: String, required: true,unique: true },
    picture: { type: String, default: '' }, 
    phone: { type: String, default: '' },
    location: { type: String, default: '' }, 
    role: {
      type: String, required: true,
      enum: ['admin', 'user'],
      default: 'user'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active'
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
