import { Router } from "express";
import Product from "../models/products.js";
import CartManager from "../service/CartManager.js";

const router = Router()
const cartManager = new CartManager()

// GET vista index.handlebars
router.get('/', async (req, res) => {
    try {
        const {page = 1, category, price, cartId} = req.query

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

        let result = await Product.paginate(query, {
            page: parseInt(page),
            limit: 5,
            lean: true,
            sort: sortOption
        })

        // Creacion de carrito
        if (!cartId) {
            const newCart = await cartManager.createCart()
            result.cartId = newCart._id.toString()
        } else {
            result.cartId = cartId
        }
        
        result.prevLink = result.hasPrevPage ? `http://localhost:8080/?page=${result.prevPage}&cartId=${result.cartId}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8080/?page=${result.nextPage}&cartId=${result.cartId}` : '';

        result.isValid = !(page <= 0 || page > result.totalPages)

        res.render('index', result)
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
})

// GET vista realTimeProducts.handlebars
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
})

// GET vista cart.handlebars
router.get('/cart/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid)
        if (cart) {
            const products = cart.products.map(p => ({
                id: p._id.toString(),
                title: p.product.title,
                price: p.product.price,
                quantity: p.quantity
            }))
            res.render('cart', { cartId: cart._id.toString(), products })
        } else {
            res.json({status: "Error", message: "No existe ese carrito"})
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
})

export default router;