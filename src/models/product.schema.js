const { default: mongoose } = require("mongoose");

const product = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    disscount:{
        type:Number,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    image:{
        type:Array,
        required:true
    }
})

const Product =  mongoose.model('Product' , product)

module.exports = Product;