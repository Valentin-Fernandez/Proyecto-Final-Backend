import { Router } from 'express'
const router = Router()

let carts = []

// GET
router.get('/cart/:cid', (req, res) => {
    let reqId = parseInt(req.params.cid)
    const cartFilter = carts.find((c => c.id === reqId))
    if (!cartFilter) {
        return res.status(400).send({status: "error", message: "No se encontro el carrito"})  
    }
    res.send(cartFilter)
})

// POST
router.post('/cart', (req, res) => {
    const newCart = {
        id: carts.length + 1,
        products: []
    }
    carts.push(newCart)
    res.send({status: "success", message:"Carrito creado con exito"})
})

router.post('/cart/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid)
    const quantity = req.body.quantity || 1;

    const cart = carts.find(c => c.id === cartId)
    if (!cart) {
        return res.status(400).send({status: "error", message: "No se encontro el carrito"})
    }

    const productCart = cart.products.find(p => p.productId === productId)
    if (productCart) {
        productCart.quantity += quantity
    } else {
        cart.products.push({ productId, quantity })
    }

    res.send({status: "success", message:"Producto agregado al carrito", cart})
})

export default router;