import { Schema, model } from 'mongoose';
const colorSchema = new Schema(
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

const colorModel = model('Color', colorSchema)
export default colorModel
