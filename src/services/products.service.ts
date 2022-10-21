/* eslint-disable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-floating-promises */
import Sequelize, { Op } from 'sequelize'
import { userModel } from '../models/users.model'
import '../models/db.model'
import { productType, productEntry, productModel, NewProductEntry, NotSensistiveInfoProducts, IProductWithoutUserModel } from '../models/products.model'

export const getProducts = async (): Promise<IProductWithoutUserModel[]> => {
  // eslint-disable-next-line @typescript-eslint/return-await
  return await productModel.findAll({
    include: { model: userModel, attributes: { exclude: ['password'] } },
    order: [
      ['Product_ID', 'DESC']
    ]
  })
    .then((result) => {
      return result
    })
}
export const getProductsWithoutSensitiveInfo = (products: productEntry[]): NotSensistiveInfoProducts[] => {
  return products.map(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ({ Product_ID, Product_Name, Product_Type, User_ID, price, quantity, img, img_ID, smallText, midText, largeText, description, createdAt, updatedAt }) => {
      return {
        Product_ID,
        Product_Name,
        Product_Type,
        User_ID,
        price,
        quantity,
        img,
        img_ID,
        smallText,
        midText,
        largeText,
        description,
        createdAt,
        updatedAt
      }
    }
  )
}
export const addProducts = async (newProductEntry: NewProductEntry): Promise<NewProductEntry> => {
  const newProduct = {
    ...newProductEntry
  }
  const products = await productModel.create(newProduct)
  return products
}

export const editProducts = async (id: number, newProductEntry: NewProductEntry): Promise<number> => {
  const result = await productModel.update(newProductEntry, { where: { Product_ID: id } })
    .then((result) => {
      return result
    })
  return +result
}

export const buyProducts = async (id: number, QuantityFromRequest: number): Promise<number> => {
  const result = await productModel.update({ quantity: Sequelize.literal(`quantity - ${QuantityFromRequest}`) }, { where: { Product_ID: id } })
    .then((result) => {
      return result
    })
  return +result
}

export const addingQuantityProducts = async (id: number, QuantityFromRequest: number): Promise<number> => {
  const result = await productModel.update({ quantity: Sequelize.literal(`quantity + ${QuantityFromRequest}`) }, { where: { Product_ID: id } })
    .then((result) => {
      return result
    })
  return +result
}

export const findProduct = (id: number): Promise<productEntry[]> | undefined => {
  return productModel.findOne({ where: { Product_ID: id } }) as any
}

export const findProductByType = (productType: productType): Promise<productEntry[]> | undefined => {
  return productModel.findAll({ where: { product_Type: productType }, order: [['Product_ID', 'DESC']] }) as any
}

export const deleteProducts = (id: number): Promise<number> | undefined => {
  return productModel.destroy({ where: { Product_ID: id } }) as any
}

export const ownProducts = (id: number): Promise<productEntry[]> | undefined => {
  return productModel.findAll({ where: { User_ID: id }, order: [['Product_ID', 'DESC']] }) as any
}

export const searchProduts = (ProductName: string): Promise<IProductWithoutUserModel[]> | undefined => {
  return productModel.findAll({
    where: { Product_Name: { [Op.like]: '%' + ProductName + '%' } }, order: [['Product_ID', 'DESC']]
  })
}
