import mongoose from "mongoose";

// Nombre de coleccion
const collectionName = 'carts'

// Schema
const cartSchema = new mongoose.Schema({
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        quantity: Number,
      },
    ],
    email: {
      type: String, ref: 'users', required: true
    }
});

const cartsModel = mongoose.model(collectionName, cartSchema)
export default cartsModel;