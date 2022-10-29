/* eslint-disable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-floating-promises */
import Sequelize from 'sequelize'
import { userModel } from '../models/users.model'
import '../models/db.model'
import { cartModel, cartEntry, NewCartEntry, cartEntryWithoutUserModel, NotSensistiveInfoCart } from '../models/cart.model'

export const getProducts = async (): Promise<cartEntryWithoutUserModel[]> => {
  // eslint-disable-next-line @typescript-eslint/return-await
  return await cartModel.findAll({
    include: { model: userModel, attributes: { exclude: ['password'] } },
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then((result) => {
      return result
    })
}
export const getProductsWithoutSensitiveInfo = (products: cartEntry[]): NotSensistiveInfoCart[] => {
  return products.map(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ({ Product_ID, Product_Name, User_ID, price, quantity, img, createdAt, updatedAt }) => {
      return {
        Product_ID,
        Product_Name,
        User_ID,
        price,
        quantity,
        img,
        createdAt,
        updatedAt
      }
    }
  )
}
export const addProductsToCart = async (newProductEntry: NewCartEntry): Promise<NewCartEntry> => {
  const newProduct = {
    ...newProductEntry
  }
  const products = await cartModel.create(newProduct)
  return products
}
export const findProduct = (id: number): Promise<cartEntry[]> | undefined => {
  return cartModel.findOne({ where: { Cart_ID: id } }) as any
}

export const buyProducts = async (id: number, QuantityFromRequest: number): Promise<number> => {
  const result = await cartModel.update({ quantity: Sequelize.literal(`quantity - ${QuantityFromRequest}`) }, { where: { Cart_ID: id } })
    .then((result) => {
      return result
    })
  return +result
}

export const addingQuantityProducts = async (id: number, QuantityFromRequest: number): Promise<number> => {
  const result = await cartModel.update({ quantity: Sequelize.literal(`quantity + ${QuantityFromRequest}`) }, { where: { Cart_ID: id } })
    .then((result) => {
      return result
    })
  return +result
}

export const editQtyProducts = async (id: number, QuantityFromRequest: number): Promise<number> => {
  const result = await cartModel.update({ quantity: QuantityFromRequest }, { where: { Cart_ID: id } })
    .then((result) => {
      return result
    })
  return +result
}

export const deleteProducts = (id: number): Promise<number> | undefined => {
  return cartModel.destroy({ where: { Cart_ID: id } }) as any
}

export const clearCart = (id: number): Promise<number> | undefined => {
  return cartModel.destroy({ where: { User_ID: id } }) as any
}

export const ownProducts = (id: number): Promise<cartEntry[]> | undefined => {
  return cartModel.findAll({ where: { User_ID: id }, order: [['Cart_ID', 'DESC']] }) as any
}
