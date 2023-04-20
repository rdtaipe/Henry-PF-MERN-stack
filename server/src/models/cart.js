import mongoose,{ Schema, model } from 'mongoose';
 
const cartSchema = new Schema({
    id: { type: String, required: true, unique: true },
    store:{
        type: Array,
        default:[] 
    },
    payment: {
        type: Array,
        default: []
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

}, {
    timestamp: true,
    versionKey: false,
}
)

const cartModel = model('Cart', cartSchema)

export default cartModel
