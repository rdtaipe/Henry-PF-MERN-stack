import { Schema, model } from 'mongoose';
const commentSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        message: {
            type: String,
        }
    },
    {
        timestamp: true,
        versionKey: false,
    }
)

const commentModel = model('Comment', commentSchema)
export default commentModel