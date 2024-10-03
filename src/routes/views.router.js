import { Router } from "express";
import Product from "../models/products.js";

const router = Router()

// GET vista home.handlebars
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

        let result = await Product.paginate(query, {
            page: parseInt(page),
            limit: 5,
            lean: true,
            sort: sortOption
        })
        
        result.prevLink = result.hasPrevPage ? `http://localhost:8080/?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8080/?page=${result.nextPage}` : '';

        result.isValid = !(page <= 0 || page > result.totalPages)

        res.render('index', result)
    } catch (error) {
        console.log(error);
    }
})

// GET vista realTimeProducts.handlebars
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
})

export default router;