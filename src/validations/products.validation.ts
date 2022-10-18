import { productType, NewProductEntry } from '../models/products.model'
import { isString, isNumber, isProductType, notEmpty } from '../utils/utils'

const parseProductName = (productNameFromRequest: any): string => {
  if (!isString(productNameFromRequest) || notEmpty(productNameFromRequest)) {
    throw new Error('Invalid Product Name')
  }
  return productNameFromRequest
}
const parseProductType = (productTypeFromRequest: any): productType => {
  if (!isString(productTypeFromRequest) || !isProductType(productTypeFromRequest) || notEmpty(productTypeFromRequest)) {
    throw new Error('Invalid Product Type')
  }
  return productTypeFromRequest
}

const parseUserID = (userIDFromRequest: any): number => {
  if (!isNumber(userIDFromRequest) || notEmpty(userIDFromRequest)) {
    throw new Error('Invalid User ID')
  }
  return userIDFromRequest
}

const parsePrice = (priceFromRequest: any): number => {
  if (!isNumber(priceFromRequest) || notEmpty(priceFromRequest)) {
    throw new Error('Invalid Price')
  }
  return priceFromRequest
}

const parseQuantity = (QuantityFromRequest: any): number => {
  if (!isNumber(QuantityFromRequest) || notEmpty(QuantityFromRequest)) {
    throw new Error('Invalid Quantity')
  }
  return QuantityFromRequest
}
const parseImg = (imgFromRequest: any): string => {
  if (!isString(imgFromRequest) || notEmpty(imgFromRequest)) {
    throw new Error('Invalid Image')
  }
  return imgFromRequest
}

const parseSmallText = (smallTextFromRequest: any): string => {
  if (!isString(smallTextFromRequest) || notEmpty(smallTextFromRequest)) {
    throw new Error('Invalid Small Text')
  }
  return smallTextFromRequest
}

const parseMidText = (midTextFromRequest: any): string => {
  if (!isString(midTextFromRequest) || notEmpty(midTextFromRequest)) {
    throw new Error('Invalid Mid Text')
  }
  return midTextFromRequest
}

const parseLargeText = (largeTextFromRequest: any): string => {
  if (!isString(largeTextFromRequest) || notEmpty(largeTextFromRequest)) {
    throw new Error('Invalid Large Text')
  }
  return largeTextFromRequest
}

const parseDescription = (descriptionFromRequest: any): string => {
  if (!isString(descriptionFromRequest) || notEmpty(descriptionFromRequest)) {
    throw new Error('Invalid Description')
  }
  return descriptionFromRequest
}

export const toNewProduct = (object: any, userIdFromRequest: any): NewProductEntry => {
  const newProduct: NewProductEntry = {
    Product_Name: parseProductName(object.Product_Name),
    Product_Type: parseProductType(object.Product_Type),
    User_ID: parseUserID(userIdFromRequest),
    price: parsePrice(object.price),
    quantity: parseQuantity(object.quantity),
    img: parseImg(object.img),
    smallText: parseSmallText(object.smallText),
    midText: parseMidText(object.midText),
    largeText: parseLargeText(object.largeText),
    description: parseDescription(object.description)
  }
  return newProduct
}
