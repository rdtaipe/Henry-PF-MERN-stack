import { Schema, model } from 'mongoose';
const commentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            default: 'No comment',
        },
        score: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        productId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        }
    },
    {
        timestamp: true,
        versionKey: false,
    }
)

const commentModel = model('Comment', commentSchema)
export default commentModel