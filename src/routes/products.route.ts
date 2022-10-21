/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as productContoller from '../controllers/products.controller'
import * as authController from '../controllers/auth.controller'
import * as policies from '../libs/policies'
import upload from '../libs/upload'

const router = Router()

router.get('/', productContoller.getProducts)
router.get('/owner', authController.auth, productContoller.ownProducts)
router.get('/productName/:param', productContoller.searchProduts)
router.get('/:Product_Type/list', productContoller.findProductByProductType)
router.put('/buy/:id', productContoller.buyProduct)
router.post('/add', /* authController.auth, policies.posterAccess, */ upload.single('image'), productContoller.newProduct)
router.put('/edit/:id', /* authController.auth, productContoller.reqProduct, policies.ownerAccess, */ upload.single('image'), productContoller.editProduct)
router.put('/addingquantity/:id', authController.auth, policies.posterAccess, productContoller.addingQuantityProduct)
router.delete('/delete/:id', /* authController.auth, productContoller.reqProduct, policies.ownerAccess, */ productContoller.deleteProduct)
router.get('/:id', productContoller.findProduct)

export default router
