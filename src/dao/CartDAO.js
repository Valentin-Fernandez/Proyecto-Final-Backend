import Cart from '../models/carts.js'

export default class CartDAO {

    static async createCart() {
        try {
            const newCart = Cart.create({products: []})
            return newCart
        } catch (error) {
            console.error('Error al crear el carrito:', error);
        }
    }

    static async getCartById(cartId){
        try {
            const cart = await Cart.findById(cartId).populate('products.product').lean()
            return cart
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
        }
    }

    static async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await Cart.findById(cartId)
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId)
            if (productIndex !== -1) {
                // Actualizar cantidad cuando el producto se encuentra en el carrito
                cart.products[productIndex].quantity += quantity
            } else {
                // Agregar producto al carrito
                cart.products.push({product: productId, quantity})
            }

            await cart.save()
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    }

    static async updateCart(cartId, products) {
        try {
            const cart = await Cart.findById(cartId)
            cart.products = products
            await cart.save()
            return cart
        } catch (error) {
            console.error('Error al remplazar los productos')
        }
    }

    static async updateQuantity(cartId, productId, quantityBody) {
        try {
            const cart = await Cart.findById(cartId)
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId)
            if (productIndex !== -1) {
                // Se encontro el producto en el carrito
                cart.products[productIndex].quantity = quantityBody
                await cart.save()
                return cart
            } else {
                throw new Error('Producto no encontrado en el carrito');
            }
        } catch (error) {
            console.error('Error al modificar la cantidad de productos', error)
            throw error
        }
    }

    static async removeProduct(cartId, productId) {
        try {
            const cart = await Cart.findById(cartId)
            cart.products = cart.products.filter(p => p.product.toString() !== productId)
            await cart.save()
            return cart
        } catch (error) {
            console.error('Error al eliminar producto del carrito:', error);
        }
    }

    static async clearCart(cartId) {
        try {
            const cart = await Cart.findById(cartId)
            cart.products = []
            await cart.save()
            return cart
        } catch (error) {
            console.error('Error al vaciar el carrito', error)
        }
    }
}