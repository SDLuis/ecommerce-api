import { Request, Response, NextFunction } from 'express'
import * as cartService from '../services/cart.service'
import { cartEntry } from '../models/cart.model'
import { parseQuantity } from '../validations/products.validation'
import { CustomRequest } from '../models/users.model'

export const getProducts = async (_req: Request, res: Response): Promise<any> => {
  try {
    await cartService.getProducts().then((response) => {
      res.status(200).send(cartService.getProductsWithoutSensitiveInfo(response as cartEntry[]))
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const newProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = {
      Product_ID: req.body.Product_ID,
      Product_Name: req.body.Product_Name,
      User_ID: (req as any).token.User_ID,
      price: parseInt(req.body.price),
      quantity: parseInt(req.body.quantity),
      img: req.body.img
    }
    const addedProduct = await cartService.addProductsToCart(body)
    res.status(200).send(addedProduct)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
export const findProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    const Product = await cartService.findProduct(id)
    res.status(200).send(Product)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const buyProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    const quantity = parseQuantity(req.body.quantity)
    const response = await cartService.buyProducts(id, quantity)
    if (response === 1) {
      res.status(200).send({ message: 'Successful purchase', status: 200 })
    } else {
      res.status(200).send({ message: 'Error, Your purchase could not be made', status: 200 })
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const addingQuantityProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    const quantity = parseQuantity(req.body.quantity)
    const response = await cartService.addingQuantityProducts(id, quantity)
    if (response === 1) {
      res.status(200).send({ message: 'Product(s) added', status: 200 })
    } else {
      res.status(200).send({ message: 'Error, Product(s) not added', status: 200 })
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    await cartService.deleteProducts(id)?.then((result) => {
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
    const Product = (await cartService.findProduct(id)) as any;
    (req as any as CustomRequest).json = Product
    next()
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const ownProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = (req as any).token.User_ID
    const Product = (await cartService.ownProducts(id)) as any
    res.status(200).send(Product)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
