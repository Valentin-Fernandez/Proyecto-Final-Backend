import CartRepository from '../repositories/CartRepository.js'
import ProductRepository from '../repositories/ProductRepository.js'
import TicketRepository from '../repositories/TicketRepository.js'
import UserRepository from '../repositories/UserRepository.js'

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
            console.error(error)
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

    static async purchase(req, res) {
        try {
            const cartId = req.params.cid;
            const cart = await CartRepository.getCartById(cartId);
            if (!cart) {
                return res.json({ status: "No existe ningun carrito" });
            }
    
            const cartFinish = [];
            const productsDelegate = [];
    
            // Validación y actualización de stock
            for (const item of cart.products) {
                const idProduct = item.product;
                const product = await ProductRepository.getByIdProduct(idProduct);
    
                if (item.quantity <= product.stock) {
                    product.stock -= item.quantity;
                    await ProductRepository.updateProduct(idProduct, { stock: product.stock });
                    cartFinish.push(item);  // Producto disponible, agregar a cartFinish
                } else {
                    productsDelegate.push(item);  // Producto sin stock suficiente
                }
            }
    
            const ticketData = {
                dateTicket: new Date(),
                totalPrice: cartFinish.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
                email: cart.email
            };

            const ticket = await TicketRepository.createTicket(ticketData);
            const cartUpdated = await CartRepository.updateCart(cartId, productsDelegate);
    
            return res.status(200).json({
                ticket,
                cartUpdated,
            });
        } catch (error) {
            console.error("Error", error);
            res.status(500).json({ message: "Error del servidor" });
        }
    }
    
}