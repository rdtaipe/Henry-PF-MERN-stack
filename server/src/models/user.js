import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
/* {
  created_at: '2023-04-25T18:47:27.460Z',
  email: '75058238@continental.edu.pe',
  email_verified: true,
  family_name: 'null,
  given_name: 'ROLANDO',
  identities: [
    {
      provider: 'google-oauth2',
      user_id: '116393237165511065810',
      connection: 'google-oauth2',
      isSocial: true
    }
  ],
  locale: 'en',
  name: 'ROLANDO',
  nickname: '75058238',
  picture: 'https://lh3.googleusercontent.com/a/AGNmyxYWqdCldsUUxE-MmBFQxKy8UAqYnSis0YHGUpyooQ=s96-c',
  updated_at: '2023-04-26T14:56:37.023Z',
  user_id: 'google-oauth2|116393237165511065810',
  last_ip: '190.236.179.210',
  last_login: '2023-04-26T14:56:37.022Z',
  logins_count: 13
} */
const userSchema = new Schema(
  {
    fullName: { type: String, },
    name: { type: String, required: true },
    email: { type: String, required: true },
    email_verified: { type: Boolean, default: false },
    password: { type: String, },
    genre: { type: String, },
    country: { type: String, },
    address: { type: String, },
    postal: { type: String, },
    sub: { type: String, required: true, unique: true },
    picture: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    origin:{type: String, default: 'http://localhost:3000'},
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
    timestamps: true,
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
