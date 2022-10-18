import { productType } from '../models/products.model'
import { role } from '../models/users.model'

export const isString = (string: string): boolean => {
  return typeof string === 'string'
}

export const notEmpty = (param: any): boolean => {
  return param === ''
}

export const isNumber = (number: number): boolean => {
  return typeof number === 'number'
}

export const isProductType = (param: any): boolean => {
  return Object.values(productType).includes(param)
}

export const isRole = (param: any): boolean => {
  return Object.values(role).includes(param)
}
