import { Schema, model } from 'mongoose';


const productShema = new Schema({
    productId: { type: String, required: true },//product id
    name: { type: String, required: true },
    image: { type: Array },
    price: { type: Number },
    description: { type: String },
    brand: { type: String },
    color: { type: String },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    total: { type: Number, required: true,},
    attr: {
        type: Object,
        default: {}
    }
},{ timestamps: true,versionKey: false,})

const purchaseSchema = new Schema(
    {
        userId: { type: String, required: true, unique: true },
        products: {
            type: [productShema],
            default: []
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const purchaseModel = model('Purchase', purchaseSchema)
export default purchaseModel