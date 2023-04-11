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
        timestamp: true,
        versionKey: false,
    }
)
const favoritesModel = model('Favorite', favoritesSchema)
export default favoritesModel
