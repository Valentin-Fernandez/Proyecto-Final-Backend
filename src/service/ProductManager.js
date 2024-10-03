import Product from '../models/products.js'

export default class ProductManager {
    constructor(path) {
        this.path = path
    }

    // Metodos
    async getAll(){
        try {
            const products = await Product.find().lean()
            return products
        } catch (error) {
            console.error('Error al obtener los productos', error)
        }
    }

    async getAllById(id){
        try {
            const product = await Product.findById(id)
            return product
        } catch (error) {
            console.error('Error al obtener el producto', error)
        }
    }

    async create(product){
        try {
            // Creacion del producto en la DB
            const newProduct = await Product.create(product)
            return newProduct
        } catch (error) {
            console.error('Error al crear el producto',error)
        }
    }

    async update(id, product){
        try {
            const updateProduct = await Product.findByIdAndUpdate(id, product)
            return updateProduct
        } catch (error) {
            console.error('Error al actualizar el producto', error)
        }
    }

    async delete(id){
        try {
            const deleteProduct = await Product.findByIdAndDelete(id)
            return deleteProduct   
        } catch (error) {
            console.error('Error al eliminar el producto', error)
        }
    }
}
