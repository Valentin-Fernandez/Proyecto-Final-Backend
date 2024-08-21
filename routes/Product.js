import { Router } from 'express'
import fs from 'fs' // -> Manejo de archivos
const router = Router()

// Funciones para leer y escribir en los Archivos
const readFile = (file) => {
    const data = fs.readFileSync(file, 'utf-8')
    return JSON.parse(data)
}

const writeFile = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8')
}

const productsFile = 'products.json'

// GET
router.get('/products', (req, res) => {
    const Products = readFile(productsFile) // -> Leer archivo products.json
    res.send(Products)
})

router.get('/products/:pid', (req, res) => {
    const Products = readFile(productsFile) // -> Leer archivo products.json
    let reqId = parseInt(req.params.pid)
    const productFilter = Products.find((p => p.id === reqId))
    if (!productFilter) {
        res.status(400).send({status:"error", message:"Producto no encontrado"})
    }
    res.send(productFilter)
})

// POST
router.post('/products', (req, res) => {
    const Products = readFile(productsFile) // -> Leer archivo products.json
    let reqProduct = req.body
    reqProduct.id = Products.length + 1
    // Validacion
    if (!reqProduct) {
        res.status(400).send({status: "error", message:"Valores incorrectos"})

    }

    Products.push(reqProduct)
    writeFile(productsFile, Products) // -> Escribir la data en products.json
    res.send({status: "success", message: "Producto creado con exito"})  
})

// PUT
router.put('/products/:pid', (req, res) => {
    const Products = readFile(productsFile) // -> Leer archivo products.json
    let reqId = parseInt(req.params.pid)
    const productFilterIndex = Products.findIndex((p => p.id === reqId))
    if (productFilterIndex < 0) {
        res.status(400).send({status:"error", message: "producto no encontrado"})
    }
    const { id, ...productUpdate } = req.body
    Products[productFilterIndex] = {...Products[productFilterIndex], ...productUpdate}
    writeFile(productsFile, Products) // -> Escribir la data en products.json
    res.send({status: "success", message: "producto actualizado con exito", producto: Products[productFilterIndex]})
})

// DELETE
router.delete('/products/:pid', (req, res) => {
    const Products = readFile(productsFile) // -> Leer archivo products.json
    let reqId = parseInt(req.params.pid)
    const productFilterIndex = Products.findIndex((p => p.id === reqId))
    if (productFilterIndex < 0) {
        res.status(400).send({status:"error", message:"Producto no encontrado"})
    }

    Products.splice(productFilterIndex, 1)
    writeFile(productsFile, Products) // -> Escribir la data en products.json
    res.send({status:"success", message:"Borrado con exito"})
})


export default router;