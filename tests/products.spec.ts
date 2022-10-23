import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'

let context: any

test.beforeAll(async ({ playwright }) => {
  context = await playwright.request.newContext({
    baseURL: 'http://localhost:5000'
  })
})

test.afterAll(async () => {
  await context.dispose()
})

test('Api show corret info', async () => {
  const products = await context.get('/products')
  const ID: number = 1
  const productName: string = 'Beats Electron'
  const productType: string = 'Wireless Headphone'

  expect(products.ok()).toBeTruthy()
  expect(await products.json()).toContainEqual(
    expect.objectContaining({
      Product_ID: ID,
      Product_Name: productName,
      Product_Type: productType
    })
  )
})

test('Search product by ID', async () => {
  const ID: number = 1
  const productName: string = 'Beats Electron'
  const productType: string = 'Wireless Headphone'
  const product = await context.get(`/products/${ID}`)

  expect(product.ok()).toBeTruthy()
  expect(await product.json()).toHaveProperty('Product_ID', ID)
  expect(await product.json()).toHaveProperty('Product_Name', productName)
  expect(await product.json()).toHaveProperty('Product_Type', productType)
})

test('Search products by product type', async () => {
  const productType: string = 'Wireless Headphone'
  const products = await context.get(`/products/${productType}/list`)

  expect(products.ok()).toBeTruthy()
  expect(await products.json()).toContainEqual(
    expect.objectContaining({
      Product_Type: productType
    })
  )
})

test('Search products by product Name', async () => {
  const productName: string = 'Beats Electron'
  const products = await context.get(`/products/productName/${productName}`)

  expect(products.ok()).toBeTruthy()
  expect(await products.json()).toContainEqual(
    expect.objectContaining({
      Product_Name: productName
    })
  )
})

test('Buy products', async () => {
  const ID: number = 2
  const product = await context.get(`/products/${ID}`)
  const getProducts = await product.text()
  const getQuantity = JSON.parse(getProducts).quantity

  const quantity: number = 5
  const products = await context.put(`/products/buy/${ID}`, {
    data: {
      quantity
    }
  })
  expect(products.ok()).toBeTruthy()
  const productAfter = await context.get(`/products/${ID}`)
  const getProductsAfter = await productAfter.text()
  const getQuantityAfter = JSON.parse(getProductsAfter).quantity
  const expectQuantity: number = getQuantity - quantity
  expect(getQuantityAfter === expectQuantity)
})

test.describe('need auth', () => {
  test.beforeEach(async ({ request }) => {
    await request.post('http://localhost:5000/auth/login', {
      data: {
        email: 'luis@gmail.com',
        password: 123
      }
    })
  })
  test('Add Product', async ({ request }) => {
    const productName: string = 'Beats Electron by Playwright'
    const productType: string = 'Wireless Headphone'

    const file = path.join(__dirname, '../public/attachments', 'logo.webp')
    const image = fs.readFileSync(file)
    await request.post('http://localhost:5000/products/add', {
      headers: {
        Accept: '*/*',
        ContentType: 'multipart/form-data'
      },
      multipart: {
        image: {
          name: file,
          mimeType: 'image/webp',
          buffer: image
        },
        Product_Name: productName,
        Product_Type: productType,
        price: 8000,
        quantity: 50,
        img_ID: 'typescript',
        smallText: 'Amazing',
        midText: 'Best design',
        largeText: 'U can not find another product like this',
        description: '20% OFF'
      }
    })
    const products = await context.get('/products')
    expect(products.ok()).toBeTruthy()
    expect(await products.json()).toContainEqual(
      expect.objectContaining({
        Product_Name: productName,
        Product_Type: productType
      })
    )
  })

  test('Edit Product', async ({ request }) => {
    const productName: string = 'Beats Electron by Playwright'
    const productNameToEdit: string = 'Beats Electron edit by Playwright'
    const productType: string = 'Wireless Headphone'
    const products = await context.get(`/products/productName/${productName}`)

    expect(products.ok()).toBeTruthy()
    const getProducts = JSON.parse(await products.text())
    const ID: number = getProducts[0].Product_ID
    const file = path.join(__dirname, '../public/attachments', 'logo.webp')
    const image = fs.readFileSync(file)

    await request.put(`http://localhost:5000/products/edit/${ID}`, {
      headers: {
        Accept: '*/*',
        ContentType: 'multipart/form-data'
      },
      multipart: {
        image: {
          name: file,
          mimeType: 'image/webp',
          buffer: image
        },
        Product_Name: productNameToEdit,
        Product_Type: productType,
        price: 8000,
        quantity: 50,
        img_ID: 'typescript',
        smallText: 'Amazing',
        midText: 'Best design',
        largeText: 'U can not find another product like this',
        description: '20% OFF'
      }
    })
    const productsAfter = await context.get('/products')
    expect(productsAfter.ok()).toBeTruthy()
    const parseProductAfter = JSON.parse(await productsAfter.text())
    expect(parseProductAfter[0]).toHaveProperty('Product_Name', productNameToEdit)
    expect(parseProductAfter[0]).toHaveProperty('Product_Type', productType)
  })

  test('Delete Product', async ({ request }) => {
    const productName: string = 'Beats Electron edit by Playwright'
    const products = await context.get(`/products/productName/${productName}`)

    expect(products.ok()).toBeTruthy()
    const getProducts = JSON.parse(await products.text())
    const ID: number = getProducts[0].Product_ID

    const res = await request.delete(`http://localhost:5000/products/delete/${ID}`)
    const status = await res.text()
    expect(status).toContain('Product deleted')
  })

  test('Owner product', async ({ request }) => {
    const UserID = 1
    const jobs = await request.get('http://localhost:5000/products/owner')
    expect(await jobs.json()).toContainEqual(
      expect.objectContaining({
        User_ID: UserID
      })
    )
  })

  test('Add quantity products', async ({ request }) => {
    const ID: number = 2
    const product = await request.get(`http://localhost:5000/products/${ID}`)
    const getProducts = await product.text()
    const getQuantity = JSON.parse(getProducts).quantity

    const quantity: number = 100
    const products = await request.put(`http://localhost:5000/products/addingquantity/${ID}`, {
      data: {
        quantity
      }
    })
    expect(products.ok()).toBeTruthy()
    const productAfter = await context.get(`/products/${ID}`)
    const getProductsAfter = await productAfter.text()
    const getQuantityAfter = JSON.parse(getProductsAfter).quantity
    const expectQuantity: number = (parseInt(getQuantity) + quantity)
    expect(getQuantityAfter === expectQuantity)
  })
})
