import CartDAO from '../dao/CartDAO.js'

export default class CartRepository {
    
    static async getCartById(id) {
        const cart = await CartDAO.getCartById(id)
        return cart
    }
    static async createCart(userId) {
        const newCart = await CartDAO.createCart(userId)
        return newCart
    }
    static async addProductToCart(cartId, productId, quantity) {
        await CartDAO.addProductToCart(cartId, productId, quantity)
    }
    static async updateCart(cartId, products) {
        const cart = await CartDAO.updateCart(cartId, products)
        return cart
    }
    static async updateQuantity(cartId, productId, quantity) {
        const cart = await CartDAO.updateQuantity(cartId, productId, quantity)
        return cart
    }
    static async removeProduct(cartId, productId) {
        const cart = await CartDAO.removeProduct(cartId, productId)
        return cart
    }
    static async clearCart(cartId) {
        const cart = await CartDAO.clearCart(cartId)
        return cart
    }

}