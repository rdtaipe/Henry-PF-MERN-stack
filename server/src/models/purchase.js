import { Schema, model } from 'mongoose';


const productShema = new Schema({
    productId: { type: String},//product id
    name: { type: String},
    image: { type: Array },
    price: { type: Number },
    description: { type: String },
    brand: { type: String },
    color: { type: String },
    date: {
        type: Date,
        default: Date.now,
    },
    total: { type: Number},
    attr: {
        type: Object,
        default: {}
    }
},)

const purchaseSchema = new Schema({
        userId: { type: String, required: true, unique:true },
        products:{
            type: [productShema],
            default: []
        },

    },{
        timestamps: true,
        versionKey: false,
    }
)

const purchaseModel = model('Purchase', purchaseSchema)
export default purchaseModel