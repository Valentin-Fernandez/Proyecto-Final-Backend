import { Router } from 'express'
import ProductManager from '../service/ProductManager.js'

const router = Router()
const productManager = new ProductManager()

// GET
router.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined
        const products = await productManager.getAllProducts(limit)
        res.json(products)
    } catch (error) {
        console.log(error);
    }
})

router.get('/products/:pid', async (req, res) => {
    try {
        let reqId = parseInt(req.params.pid)
        const product = await productManager.getProductById(reqId)
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({error: "Producto no encontrado"})
        }
    } catch (error) {
        console.log(error);
    }
})

// POST
router.post('/products', async (req, res) => {
    try {
        const {title, description, code, price, stock, category, thumbnails} = req.body
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({error: "Todos los campos son obligatorios excepto thumbnails"})
        }

        const newProduct = await productManager.addProduct({title, description, code, price, stock, category, thumbnails})
        res.status(201).json(newProduct)
    } catch (error) {
        console.log(error);
    }
})

// PUT
router.put('/products/:pid', async (req, res) => {
    try {
        let reqId = parseInt(req.params.pid)
        const updateProduct = await productManager.updateProduct(reqId, req.body) 
        if (updateProduct) {
            res.json(updateProduct)
        } else {
            res.status(404).json({error: "Producto no encontrado"})
        }
    } catch (error) {
        console.log(error);
    }
})

// DELETE
router.delete('/products/:pid', async (req, res) => {
    try {
        let reqId = parseInt(req.params.pid)
        const deleteProduct = await productManager.deleteProduct(reqId)
        if (deleteProduct) {
            res.json(deleteProduct)
        } else {
            res.status(404).json({error: "El producto no fue borrado"})
        }
    } catch (error) {
        console.log(error);
    }
})


export default router;