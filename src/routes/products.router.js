import { Router } from 'express'
import ProductManager from '../service/ProductManager.js'
import Product from '../models/products.js'

const router = Router()
const productManager = new ProductManager()

// GET
router.get('/', async (req, res) => {
    try {
        const {page = 1, category, price} = req.query

        // Categoria
        let query = {}
        if (category) {
            query.category = category
        }

        // Ordenamiento
        let sortOption = {}
        if (price) {
            sortOption.price = price === 'asc' ? 1 : -1
        }


        let products = await Product.paginate(query, {
            page: parseInt(page),
            limit: 5,
            lean: true,
            sort: sortOption
        })

        res.json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.hasPrevPage ? products.page - 1 : null,
            nextPage: products.hasNextPage ? products.page + 1 : null,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/products?page=${products.page - 1}` : null,
            nextLink: products.hasNextPage ? `/products?page=${products.page + 1}` : null,
          });

    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
})

router.get('/:pid', async (req, res) => {
    try {
        let reqId = req.params.pid
        const product = await productManager.getAllById(reqId)
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({error: "Producto no encontrado"})
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
})

// POST
router.post('/', async (req, res) => {
    try {
        const {title, description, price, stock, category} = req.body
        if (!title || !price || !stock) {
            return res.status(400).json({error: "Todos los campos son obligatorios excepto description y category"})
        }
        const newProduct = await productManager.create({title, description, price, stock, category})
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
})

// PUT
router.put('/:pid', async (req, res) => {
    try {
        let reqId =req.params.pid
        const updateProduct = await productManager.update(reqId, req.body) 
        if (updateProduct) {
            res.json({status: "Success"})
        } else {
            res.status(404).json({status: "Error, producto no encontrado"})
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
})

// DELETE
router.delete('/:pid', async (req, res) => {
    try {
        let reqId = req.params.pid
        const deleteProduct = await productManager.delete(reqId)
        if (deleteProduct) {
            res.json({status:"Success"})
        } else {
            res.status(404).json({error: "El producto no fue borrado"})
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
})

export default router;