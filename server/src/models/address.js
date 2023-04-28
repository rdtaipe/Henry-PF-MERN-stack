import { Schema, model } from 'mongoose';


const addressSchema = new Schema({
    street: {
        type: String
    },
    codeNumber: {
        type: Number
    },
    phoneNumber: {
        type: Number
    },
    houseNumber: {
        type: Number
    },
    cp: {
        type: Number
    }
    ,
    city: {
        type: String
    },
    userId: {
        type: String
    },
    country: {
        type: String
    },
},
{
    timestamps: true,
    versionKey: false
})

const addressModel = model('Address', addressSchema)

export default addressModel