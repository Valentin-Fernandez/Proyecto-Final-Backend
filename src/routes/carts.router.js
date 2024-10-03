import { Router } from 'express'
import CartManager from '../service/CartManager.js'
const router = Router()

const cartManager = new CartManager()

// GET
router.get('/:cid', async (req, res) => {
    try {
        let reqId = req.params.cid
        const cart = await cartManager.getCartById(reqId)
        if (cart) {
            res.json({status: "Success", payload: cart})
        } else {
            res.status(404).json({error: "Carrito no encontrado"})
        }
    } catch (error) {
        console.log(error);
    } 
})

// POST
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart()
        res.json({status: "Success", payload: newCart})
    } catch (error) {
        console.log(error);
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const quantity = req.body.quantity
        cartManager.addProductToCart(cartId, productId, quantity)
        res.json({status: "Success"})
    } catch (error) {
        console.error("No se encontro el carrito", error)
    }
})

router.put('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const products = req.body
        const cart = await cartManager.updateCart(cartId, products)
        res.json({status: "Success", payload: cart})
    } catch (error) {
        console.error("Error", error)
    }
})

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const carrito = await cartManager.removeProduct(cartId, productId)
        if (carrito) {
            res.json({status: "Success", payload: carrito})
        } else {
            res.json({status: "Error al eliminar el producto del carrito"})
        }
        
    } catch (error) {
        console.error('Error al eliminar el producto del carrito', error)
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = cartManager.clearCart(cartId)
        res.json({status: "Success", payload: cart})
    } catch (error) {
        console.error(error)
    }
})
export default router;