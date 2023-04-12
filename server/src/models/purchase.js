import { Schema, model } from 'mongoose';

const purchaseSchema = new Schema(
    {
        paymentId: {
            type: String,
        },
        userId: {
            type: String,
        },
        products: {
            type: Array,
        },
        addresId: {
            type: String,
        },
        time:{
            type:Date
        },
        state:{
            type:String
        }
    },
    {
        timestamp: true,
        versionKey: false,
    }
)

const purchaseModel = model('Purchase', purchaseSchema)

export default purchaseModel