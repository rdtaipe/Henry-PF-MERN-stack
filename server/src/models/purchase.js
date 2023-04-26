import { Schema, model } from 'mongoose';


const productShema =new Schema({
    id: { type: String, required: true, unique: true },//product id
    name: { type: String, required: false},
    image: { type: Array, required: false},
    price: { type: Number, required: false},
    date:{type: Date, default: Date.now},
    total:{ type:Number,default:1},
    active:{
        type:Boolean,
        default: true
    },
    attr:{
        type:Object,
        default:{}
    }
})
const purchaseSchema = new Schema(
    {
        id: { type: String, required: true, unique: true },
        products:{
            ///type Array of productShema
            type:[productShema],
            default:[]
        },
    },
    {
        timestamp: true,
        versionKey: false,
    }
)

const purchaseModel = model('Purchase', purchaseSchema)
export default purchaseModel