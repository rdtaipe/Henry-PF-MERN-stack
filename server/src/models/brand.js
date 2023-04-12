import { Schema, model } from 'mongoose';

const brandSchema = new Schema(
    {
        name: {
            type: String,
        },
    },
    {
        timestamp: true,
        versionKey: false,
    }
)
const brandModel = model('Brand', brandSchema)
module.exports = brandModel