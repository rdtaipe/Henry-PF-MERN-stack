import { Schema, model } from 'mongoose';
const scoreSchema = new Schema(
    {
        userId: {
            type: String,
        },
        score: {
            type: Number,
        },
        comment: {
            type: String,
        },
        productId: {
            type: String
        }
    },
    {
        timestamp: true,
        versionKey: false,
    }
)

const scoreModel = model('Score', scoreSchema)
export default scoreModel