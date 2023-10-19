const mongoose =require('mongoose')

const productSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "Please enter the name of the product"]
    },

    description : {
        type: String,
        required :true,
    },

    price : {
        type : Number,
        required: true,

    },

    quantity : {
        type : Number,
        required: true,
        default: 0
},
    category: {
        type: String,
        required: true
    }
    },
    {
        collection: 'product'
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product',productSchema);
module.exports =Product;