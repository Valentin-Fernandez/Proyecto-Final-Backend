import CartRepository from '../repositories/CartRepository.js'

export default class CartController {

    static async getCartById(req, res) {
        try {
            let reqId = req.params.cid
            const cart = await CartRepository.getCartById(reqId)
            if (cart) {
                res.json({status: "Success", payload: cart})
            } else {
                res.json({error: "Carrito no encontrado"})
            }
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor' });
        } 
    }
    static async createCart(req, res) {
        try {
            const newCart = await CartRepository.createCart()
            res.json({status: "Success", payload: newCart})
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
    static async addProduct(req, res) {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const quantity = req.body.quantity
            await CartRepository.addProductToCart(cartId, productId, quantity)
            res.json({status: "Success"})
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
    static async updateCart(req, res) {
        try {
            const cartId = req.params.cid
            const products = req.body
            const cart = await CartRepository.updateCart(cartId, products)
            res.json({status: "Success", payload: cart})
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
    static async updateQuantity(req, res) {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const {quantity} = req.body
            const cart = await CartRepository.updateQuantity(cartId, productId, quantity)
            res.json({status: "Success", payload: cart})
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
    static async removeProduct(req, res) {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const carrito = await CartRepository.removeProduct(cartId, productId)
            if (carrito) {
                res.json({status: "Success", payload: carrito})
            } else {
                res.json({status: "Error al eliminar el producto del carrito"})
            }
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
    static async clearCart(req, res) {
        try {
            const cartId = req.params.cid
            const cart = CartRepository.clearCart(cartId)
            res.json({status: "Success", payload: cart})
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
}