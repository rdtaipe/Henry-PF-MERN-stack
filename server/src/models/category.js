import { Schema, model } from 'mongoose';
const categorySchema = new Schema(
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

const categoryModel = model('Category', categorySchema)
export default categoryModel