import { Schema, model } from 'mongoose';
const favoritesSchema = new Schema(
    {
        product: {
            type: String,
        },
        userId: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const favoritesModel = model('Favorite', favoritesSchema)
export default favoritesModel
