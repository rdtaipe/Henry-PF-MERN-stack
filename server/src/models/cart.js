import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    store:{
        type: Array,
    },
    payment: {
        type: Array,
    },

}, {
    timestamp: true,
    versionKey: false,
}
)

const cartModel = model('Cart', cartSchema)

export default cartModel
