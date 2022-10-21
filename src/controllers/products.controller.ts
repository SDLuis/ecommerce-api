/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express'
import * as productService from '../services/products.service'
import { productEntry, productType } from '../models/products.model'
import * as productValidation from '../validations/products.validation'
import { CustomRequest } from '../models/users.model'
import { parseQuantity } from '../validations/products.validation'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

export const getProducts = async (_req: Request, res: Response): Promise<any> => {
  try {
    await productService.getProducts().then((response) => {
      res.status(200).send(productService.getProductsWithoutSensitiveInfo(response as productEntry[]))
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const newProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file?.path as string)
    fs.unlink(req.file?.path as string, function (err) {
      if (err) {
        console.log(err)
      }
    })
    const body = {
      Product_Name: req.body.Product_Name,
      Product_Type: req.body.Product_Type,
      price: parseInt(req.body.price),
      quantity: parseInt(req.body.quantity),
      img: secure_url,
      img_ID: public_id,
      smallText: req.body.smallText,
      midText: req.body.midText,
      largeText: req.body.largeText,
      description: req.body.description
    }
    const NewProductEntry = productValidation.toNewProduct(body, 1)
    const addedProduct = await productService.addProducts(NewProductEntry)
    res.status(200).send(addedProduct)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const editProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file?.path as string)
    fs.unlink(req.file?.path as string, function (err) {
      if (err) {
        console.log(err)
      }
    })
    const body = {
      Product_Name: req.body.Product_Name,
      Product_Type: req.body.Product_Type,
      price: parseInt(req.body.price),
      quantity: parseInt(req.body.quantity),
      img: secure_url,
      img_ID: public_id,
      smallText: req.body.smallText,
      midText: req.body.midText,
      largeText: req.body.largeText,
      description: req.body.description
    }
    const { img_ID } = await productService.findProduct(id) as any
    img_ID ? await cloudinary.uploader.destroy(img_ID as string) : ''
    const paramToEdit = productValidation.toNewProduct(body, 1)
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

export const buyProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    const quantity = parseQuantity(req.body.quantity)
    const response = await productService.buyProducts(id, quantity)
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
    const response = await productService.addingQuantityProducts(id, quantity)
    if (response === 1) {
      res.status(200).send({ message: 'Product(s) added', status: 200 })
    } else {
      res.status(200).send({ message: 'Error, Product(s) not added', status: 200 })
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
    const { img_ID } = await productService.findProduct(id) as any
    img_ID ? await cloudinary.uploader.destroy(img_ID as string) : ''
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

export const ownProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = (req as any).token.User_ID
    const Product = (await productService.ownProducts(id)) as any
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
