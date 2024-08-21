import { Router } from 'express'
import fs from 'fs'
const router = Router()

// Funciones para leer y escribir en los Archivos
const readFile = (file) => {
    const data = fs.readFileSync(file, 'utf-8')
    return JSON.parse(data)
}

const writeFile = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8')
}

const cartsFile = 'carts.json'

// GET
router.get('/cart/:cid', (req, res) => {
    const carts = readFile(cartsFile) // -> Leer archivo carts.json
    let reqId = parseInt(req.params.cid)
    const cartFilter = carts.find((c => c.id === reqId))
    if (!cartFilter) {
        return res.status(400).send({status: "error", message: "No se encontro el carrito"})  
    }
    res.send(cartFilter)
})

// POST
router.post('/cart', (req, res) => {
    const carts = readFile(cartsFile) // -> Leer archivo carts.json
    const newCart = {
        id: carts.length + 1,
        products: []
    }
    carts.push(newCart)
    writeFile(cartsFile, carts) // -> Escribir la data en carts.json
    res.send({status: "success", message:"Carrito creado con exito"})
})

router.post('/cart/:cid/product/:pid', (req, res) => {
    const carts = readFile(cartsFile) // -> Leer archivo carts.json
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

    writeFile(cartsFile, carts) // -> Escribir la data en carts.json
    res.send({status: "success", message:"Producto agregado al carrito", cart})
})

export default router;