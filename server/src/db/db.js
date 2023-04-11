import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


var {DB_URI}=process.env||{DB_URI:"mongodb://localhost:27017/test"}

export const connect= async()=> {
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("connect to mogodb atlas ")
}
