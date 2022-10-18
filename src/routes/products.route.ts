/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as productContoller from '../controllers/products.controller'

const router = Router()

router.get('/', productContoller.getProducts)
router.get('/owner', productContoller.ownProducts)
router.post('/add', productContoller.newProduct)
router.put('/edit/:id', productContoller.editProduct)
router.get('/:id', productContoller.findProduct)
router.get('/:Product_Type/list', productContoller.findProductByProductType)
router.get('/productName/:param', productContoller.searchProduts)
router.delete('/delete/:id', productContoller.deleteProduct)

export default router
