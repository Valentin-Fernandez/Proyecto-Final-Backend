import mongoose from "mongoose";
import moongosePaginate from 'mongoose-paginate-v2'

// Nombre de la coleccion
const collectionName = 'products'

// Schema
const productShema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    stock: { type: Number, required: true },
    status: { type: Boolean }
})

// Plugin de paginacion
productShema.plugin(moongosePaginate)

const productsModel = mongoose.model(collectionName, productShema)
export default productsModel

