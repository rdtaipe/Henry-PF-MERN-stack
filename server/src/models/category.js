import { Schema, model } from 'mongoose';
const categorySchema = new Schema(
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

const categoryModel = model('Category', categorySchema)
export default categoryModel