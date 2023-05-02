import { Schema, model } from 'mongoose';

const brandSchema = new Schema(
    {
        name: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const brandModel = model('Brand', brandSchema)
export default brandModel