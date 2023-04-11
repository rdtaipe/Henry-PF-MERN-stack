import { Schema, model } from 'mongoose';
const productSchema = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        stock: {
            type: Number,
        },
        color: {
            type: String,
        },
        size: {
            type: Array,
        },
        category: {
            type: Array,
        },
        image: {
            type: Array,
        },
        genre: {
            type: String,
        },
        brand: {
            type: Object,
        },
        price: {
            type: Number,
        },
        active: {
            type: Boolean,
        },
        featured: {
            type: Boolean
        }
    },
    {
        timestamp: true,
        versionKey: false,
    }
)

const productModel = model('Product', productSchema)
export default productModel
