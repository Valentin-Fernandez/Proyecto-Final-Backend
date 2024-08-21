import { Router } from 'express'
const router = Router()

let Products = []

// GET
router.get('/products', (req, res) => {
    res.send(Products)
})

router.get('/products/:pid', (req, res) => {
    let reqId = parseInt(req.params.pid)
    const productFilter = Products.find((p => p.id === reqId))
    if (!productFilter) {
        res.status(400).send({status:"error", message:"Producto no encontrado"})
    }
    res.send(productFilter)
})

// POST
router.post('/products', (req, res) => {
    let reqProduct = req.body
    reqProduct.id = Products.length + 1
    // Validacion
    if (!reqProduct) {
        res.status(400).send({status: "error", message:"Valores incorrectos"})

    }

    Products.push(reqProduct)
    res.send({status: "success", message: "Producto creado con exito"})  
})

// PUT
router.put('/products/:pid', (req, res) => {
    let reqId = parseInt(req.params.pid)
    const productFilterIndex = Products.findIndex((p => p.id === reqId))
    if (productFilterIndex < 0) {
        res.status(400).send({status:"error", message: "producto no encontrado"})
    }
    const { id, ...productUpdate } = req.body
    Products[productFilterIndex] = {...Products[productFilterIndex], ...productUpdate}
    res.send({status: "success", message: "producto actualizado con exito", producto: Products[productFilterIndex]})

})

// DELETE
router.delete('/products/:pid', (req, res) => {
    let reqId = parseInt(req.params.pid)
    const productFilterIndex = Products.findIndex((p => p.id === reqId))
    if (productFilterIndex < 0) {
        res.status(400).send({status:"error", message:"Producto no encontrado"})
    }

    Products.splice(productFilterIndex, 1)
    res.send({status:"success", message:"Borrado con exito"})
})


export default router;