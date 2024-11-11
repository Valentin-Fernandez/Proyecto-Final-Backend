import ProductRepository from "../repositories/ProductRepository.js";

export default class ProductController {

    static async getProducts(req, res) {
        try {
            const { page = 1, category, price } = req.query
            let query = {}
            let sortOption = {}

            if (category) {
                query.category = category
            }

            if (price) {
                sortOption.price = price === 'asc' ? 1 : -1
            }

            const products = await ProductRepository.getAllProducts(query, page, 5, sortOption)
            res.json({status: 'success', payload: products})
        } catch (error) {
            res.status(500).json({message: 'Error del servidor'})
        }
    }

    static async getProductById(req, res) {
        try {
            const idProduct = req.params.pid
            const product = await ProductRepository.getByIdProduct(idProduct)
            if (product) {
                res.json({status: 'success', payload: product})
            } else {
                res.status(404).json({error: "Producto no encontrado"})
            }
        } catch (error) {
            res.status(500).json({message: 'Error del servidor'})
        }
    }

    static async createProduct(req, res) {
        try {
            const {title, description, price, stock, category} = req.body
            if (!title || !price || !stock) {
                return res.status(400).json({error: "Todos los campos son obligatorios excepto description y category"})
            }

            const newProduct = await ProductRepository.createProduct({title, description, price, stock, category})
            res.status(201).json(newProduct)
        } catch (error) {
            res.status(500).json({message: 'Error del servidor'})
        }
    }

    static async updateProduct(req, res) {
        try {
            const idProduct = req.params.pid
            const product = req.body
            const updatedProduct = await ProductRepository.updateProduct(idProduct, product)

            if (updatedProduct) {
                res.json({status: "Success"})
            } else {
                res.status(404).json({status: "Error, producto no encontrado"})
            }
        } catch (error) {
            console.error('UPDATE', error)
            res.status(500).json({message: 'Error del servidor'})           
        }
    }

    static async deleteProduct(req, res) {
        try {
            const idProduct = req.params.pid
            const deleteProduct = await ProductRepository.deleteProduct(idProduct)

            if (deleteProduct) {
                res.json({status:"Success"})
            } else {
                res.status(404).json({error: "El producto no fue borrado"})
            }
        } catch (error) {
            res.status(500).json({message: 'Error del servidor'})
        }
    }
}