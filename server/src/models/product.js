import { Schema, model } from 'mongoose';

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        stock: {
            type: Number,
        },
        color: {//filtrado
            type: String,
            enum: ['black', 'white', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'brown', 'gray', 'pink', 'silver', 'gold', 'beige', 'multicolor'],
            default: 'multicolor'
        },
        size: {
            type: Array,
            default: ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']
        },
        category: {//filtrado
            type: String,
            enum: ['T-shirts', 'Shirts', 'Hoodies & Sweatshirts', 'Sweaters', 'Jackets & Coats', 'Jeans', 'Pants', 'Shorts', 'Skirts', 'Dresses', 'Suits & Blazers', 'Underwear & Socks', 'Activewear', 'Swimwear', 'Sleepwear & Robes', 'Accessories', 'Shoes'],
            default: 'T-shirts'
        },
        image: {
            type: Array,
            default:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJdmyvnQJBB9cl14jndoH31emPqqZGc8fQ&usqp=CAU']
        },
        genre: {//filtrado
            type: String,
            enum:['male','women','unisex','Kids'],
            default:'unisex'
        },
        brand: {//filtrado
            type: Object,
            enum:['Nike','Adidas','Puma','Under Armour','Reebok','Levi\'s','Gucci','Prada','Versace','Armani','Calvin Klein','Ralph Lauren'],
            default: 'Nike'
        },
        brandInfo: {
            type: Object,
        },
        price: {
            type: Number,
            enum: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000],
        },
        active: {
            type: Boolean, //true
        },
        featured: {
            type: Boolean  //true
        }
    },
    {
        timestamp: true,
        versionKey: false,
    }
);

const productModel = model('Product', productSchema)
export default productModel