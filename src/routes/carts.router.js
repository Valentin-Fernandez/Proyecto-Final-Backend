import { Router } from 'express'
import CartManager from '../service/CartManager.js'
const router = Router()

const cartManager = new CartManager()

// GET
router.get('/cart/:cid', async (req, res) => {
    try {
        let reqId = parseInt(req.params.cid)
        const cart = await cartManager.getCartById(reqId)
        if (cart) {
            res.json(cart)
        } else {
            res.status(404).json({error: "Carrito no encontrado"})
        }
    } catch (error) {
        console.log(error);
    } 
})

// POST
router.post('/cart', async (req, res) => {
    try {
        const newCart = await cartManager.addCart()
        res.json(newCart)
    } catch (error) {
        console.log(error);
    }
})

router.post('/cart/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid)
    const quantity = req.body.quantity || 1;
    const carrito = cartManager.addCartAddProduct(cartId, productId, quantity)
    
    if (!carrito) {
        res.send({error: "No se encontro el carrito"})
    }
    res.json(carrito)
})

export default router;