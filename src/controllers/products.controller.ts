import { NextFunction, Request, Response } from 'express'
import * as productService from '../services/products.service'
import { productType } from '../models/products.model'
import * as productValidation from '../validations/products.validation'
import { CustomRequest } from '../models/users.model'

export const getProducts = async (_req: Request, res: Response): Promise<any> => {
  try {
    await productService.getProducts().then((response) => {
      res.status(200).send(productService.getProductsWithoutSensitiveInfo(response))
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const newProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const NewProductEntry = productValidation.toNewProduct(req.body, 2 /* (req as any).token.User_ID */)
    const addedProduct = productService.addProducts(NewProductEntry)
    res.status(200).send(addedProduct)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const editProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    const paramToEdit = productValidation.toNewProduct(req.body, 1)
    const Product = await productService.editProducts(id, paramToEdit)
    if (+Product === 1) {
      res.status(200).send({ message: 'Product Edit', status: 200 })
    } else {
      res.status(200).send({ message: 'Error, Product was not edited', status: 400 })
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const findProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    const Product = await productService.findProduct(id)
    res.status(200).send(Product)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const findProductByProductType = async (req: Request, res: Response): Promise<any> => {
  try {
    const Type = req.params.Product_Type
    const Product = await productService.findProductByType(Type as productType)
    res.status(200).send(Product)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    await productService.deleteProducts(id)?.then((result) => {
      if (result === 1) {
        res.status(200).send('Product deleted')
      } else {
        res.status(400).send('Error')
      }
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const reqProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const id = +req.params.id
    const Product = (await productService.findProduct(id)) as any;
    (req as any as CustomRequest).json = Product
    next()
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const ownProducts = async (_req: Request, res: Response): Promise<any> => {
  try {
    // const id = (req as any).token.User_ID
    const Product = (await productService.ownProducts(2)) as any
    res.status(200).send(Product)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const searchProduts = async (req: Request, res: Response): Promise<any> => {
  try {
    const param = req.params.param
    const Product = (await productService.searchProduts(param)) as any
    res.status(200).send(Product)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
