/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as productContoller from '../controllers/products.controller'
import * as authController from '../controllers/auth.controller'
import * as policies from '../libs/policies'

const router = Router()

router.get('/', productContoller.getProducts)
router.get('/owner', authController.auth, productContoller.ownProducts)
router.post('/add', authController.auth, policies.posterAccess, productContoller.newProduct)
router.put('/edit/:id', authController.auth, productContoller.reqProduct, policies.ownerAccess, productContoller.editProduct)
router.put('/buy/:id', productContoller.buyProduct)
router.put('/addingquantity/:id', authController.auth, policies.posterAccess, productContoller.addingQuantityProduct)
router.get('/:id', productContoller.findProduct)
router.get('/:Product_Type/list', productContoller.findProductByProductType)
router.get('/productName/:param', productContoller.searchProduts)
router.delete('/delete/:id', authController.auth, productContoller.reqProduct, policies.ownerAccess, productContoller.deleteProduct)

export default router
