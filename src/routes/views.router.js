import { Router } from "express";
import Product from "../models/products.js";
import CartManager from "../dao/CartDAO.js";
import ProductRepository from "../repositories/ProductRepository.js";
import CartRepository from "../repositories/CartRepository.js";

import passport from "passport";
import { authorization } from "../middlewares/authorization.js";
import { decodeToken } from "../middlewares/decodeToken.js";

const router = Router()
const cartManager = new CartManager()

// GET vista index.handlebars
router.get('/', decodeToken , async (req, res) => {
    try {
        const {page = 1, category, price} = req.query

        // Decodificar Token
        const user = req.user
        const cartId = user ? user.cart : null

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

        let result = await ProductRepository.getAllProducts(query, page, 5, sortOption)
        
        result.prevLink = result.hasPrevPage ? `http://localhost:8080/?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8080/?page=${result.nextPage}` : '';

        result.isValid = !(page <= 0 || page > result.totalPages)

        res.render('index',{...result, cartId})
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
})

// GET vista realTimeProducts.handlebars
router.get('/realtimeproducts', passport.authenticate('jwt', { session: false }), authorization(['ADMIN']), (req, res) => {
    res.render('realTimeProducts')
})

// GET vista cart.handlebars
router.get('/cart/:cid', async (req, res) => {
    try {
        const cart = await CartRepository.getCartById(req.params.cid)
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
        console.error(error)
        res.status(500).json({ message: 'Error del servidor' });
    }
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

export default router;