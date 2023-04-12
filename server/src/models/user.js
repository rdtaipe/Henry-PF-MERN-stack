import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true }, // nombre del enpleado
    sub: { type: String, required: true }, // sub del enpleado esto nos dara el auth0 en el futoro
    picture: { type: String, default:''}, // avatar del enpleado
    phone: { type: Number,default:999999999}, // teléfono del enpleado
    email:{ type: String, required: true }, // email del enpleado
    ip: { type: String, default:''}, // ip del enpleado
    location: { type: String, default:''}, // ubicación del enpleado
    role: { type: String, required: true, 
      enum: ['admin', 'user'],
      default: 'user'}, // rol del enpleado
    status: { type: String,
      enum: ['active', 'inactive','suspended'],
      default: 'active'}, // estado del enpleado
}, {
    timestamps: true,
    versionKey: false
});


const userModel = model('User', userSchema)

export default userModel