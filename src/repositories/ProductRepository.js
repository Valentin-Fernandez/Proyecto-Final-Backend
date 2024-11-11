import ProductDAO from '../dao/ProductDAO.js'

export default class ProductRepository {

    static async getAllProducts(query, page, limit, sortOption) {
        const options = {
            page: parseInt(page),
            limit,
            sort: sortOption,
            lean: true
        }
        const products = await ProductDAO.getAll(query, options)
        return products
    }

    static async getByIdProduct(id) {
        const product = await ProductDAO.getAllById(id)
        return product
    }

    static async createProduct(product) {
        const newProduct = await ProductDAO.create(product)
        return newProduct
    }

    static async updateProduct(id, product) {
        const updateProduct = await ProductDAO.update(id, product)
        return updateProduct
    }

    static async deleteProduct(id) {
        const deleteProduct = await ProductDAO.delete(id)
        return deleteProduct
    }
}
