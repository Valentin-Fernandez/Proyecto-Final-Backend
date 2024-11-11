import Product from '../models/products.js'

export default class ProductManager {

    // Metodos
    static async getAll(query, options){
        return await Product.paginate(query, options)
    }

    static async getAllById(id){
        try {
            const product = await Product.findById(id)
            return product
        } catch (error) {
            console.error('Error al obtener el producto', error)
        }
    }

    static async create(product){
        try {
            // Creacion del producto en la DB
            const newProduct = await Product.create(product)
            return newProduct
        } catch (error) {
            console.error('Error al crear el producto',error)
        }
    }

    static async update(id, product){
        try {
            const updateProduct = await Product.findByIdAndUpdate(id, product)
            return updateProduct
        } catch (error) {
            console.error('Error al actualizar el producto', error)
        }
    }

    static async delete(id){
        try {
            const deleteProduct = await Product.findByIdAndDelete(id)
            return deleteProduct   
        } catch (error) {
            console.error('Error al eliminar el producto', error)
        }
    }
}
