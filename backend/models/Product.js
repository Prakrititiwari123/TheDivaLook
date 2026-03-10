import mongoose from "mongoose"

const productSchema = new mongoose.Schema({

    name:String,
    brand:String,
    price:Number,
    image:String,
    shade:String

})

export default mongoose.model("Product", productSchema)