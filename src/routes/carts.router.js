import { Router } from 'express'
import CartController from '../controllers/CartController.js'
const router = Router()

router.get('/:cid', CartController.getCartById)
router.post('/', CartController.createCart)
router.post('/:cid/product/:pid', CartController.addProduct)
router.put('/:cid', CartController.updateCart)
router.put('/:cid/product/:pid', CartController.updateQuantity)
router.delete('/:cid/product/:pid', CartController.removeProduct)
router.delete('/:cid', CartController.clearCart)

export default router;