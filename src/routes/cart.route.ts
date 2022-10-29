/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as cartContoller from '../controllers/cart.controller'
import * as authController from '../controllers/auth.controller'
import HandlePay from '../services/stripe.service'
import * as policies from '../libs/policies'

const router = Router()

router.get('/', cartContoller.getProducts)
router.get('/owner', authController.auth, cartContoller.ownProducts)
router.post('/stripe', HandlePay)
router.post('/add', authController.auth, policies.posterAccess, cartContoller.newProduct)
router.put('/buy/:id', cartContoller.buyProduct)
router.put('/edit/:id', authController.auth, cartContoller.reqProduct, policies.ownerAccess, cartContoller.EditQuantityProduct)
router.put('/addingquantity/:id', authController.auth, policies.posterAccess, cartContoller.addingQuantityProduct)
router.delete('/delete/:id', authController.auth, cartContoller.reqProduct, policies.ownerAccess, cartContoller.deleteProduct)
router.get('/:id', cartContoller.findProduct)
router.delete('/clearCart', authController.auth, cartContoller.clearCart)

export default router
