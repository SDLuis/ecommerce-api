import { test, expect } from '@playwright/test'

let context: any

test.beforeAll(async ({ playwright }) => {
  context = await playwright.request.newContext({
    baseURL: 'http://localhost:5000'
  })
})

test.afterAll(async () => {
  await context.dispose()
})

test('Api show cart entry', async () => {
  const products = await context.get('/cart')
  const ID: number = 1
  const productName: string = 'Beats Electron'

  expect(products.ok()).toBeTruthy()
  expect(await products.json()).toContainEqual(
    expect.objectContaining({
      Product_ID: ID,
      Product_Name: productName
    })
  )
})

test('Search product in cart by ID', async () => {
  const ID: number = 4
  const productName: string = 'Beats Electron'
  const product = await context.get(`/cart/${ID}`)

  expect(product.ok()).toBeTruthy()
  expect(await product.json()).toHaveProperty('Product_ID', 1)
  expect(await product.json()).toHaveProperty('Product_Name', productName)
})

test('Buy products in cart', async () => {
  const ID: number = 4
  const product = await context.get(`/cart/${ID}`)
  const getProducts = await product.text()
  const getQuantity = JSON.parse(getProducts).quantity

  const quantity: number = 5
  const products = await context.put(`/cart/buy/${ID}`, {
    data: {
      quantity
    }
  })
  expect(products.ok()).toBeTruthy()
  const productAfter = await context.get(`/cart/${ID}`)
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
  /* test('Add Product', async ({ request }) => {
    const productName: string = 'Beats Electron in Cart by Playwright'
    const productType: string = 'Wireless Headphone'
    await request.post('http://localhost:5000/products/add', {
      data: {
        Product_ID: 1,
        Product_Name: productName,
        price: 8000,
        quantity: 50,
        img: 'typescript'
      }
    })
    const products = await context.get('/cart')
    expect(products.ok()).toBeTruthy()
    expect(await products.json()).toContainEqual(
      expect.objectContaining({
        Product_Name: productName
      })
    )
  })

  /* test('Delete Product', async ({ request }) => {
    const productName: string = 'Beats Electron in Cart by Playwright'
    const products = await context.get(`/cart/productName/${productName}`)

    expect(products.ok()).toBeTruthy()
    const getProducts = JSON.parse(await products.text())
    const ID: number = getProducts[0].Product_ID

    const res = await request.delete(`http://localhost:5000/products/delete/${ID}`)
    const status = await res.text()
    expect(status).toContain('Product deleted')
  }) */

  test('Owner product in cart', async ({ request }) => {
    const UserID = 1
    const jobs = await request.get('http://localhost:5000/products/owner')
    expect(await jobs.json()).toContainEqual(
      expect.objectContaining({
        User_ID: UserID
      })
    )
  })

  test('Add quantity products in cart', async ({ request }) => {
    const ID: number = 4
    const product = await request.get(`http://localhost:5000/cart/${ID}`)
    const getProducts = await product.text()
    const getQuantity = JSON.parse(getProducts).quantity

    const quantity: number = 100
    const products = await request.put(`http://localhost:5000/cart/addingquantity/${ID}`, {
      data: {
        quantity
      }
    })
    expect(products.ok()).toBeTruthy()
    const productAfter = await context.get(`/cart/${ID}`)
    const getProductsAfter = await productAfter.text()
    const getQuantityAfter = JSON.parse(getProductsAfter).quantity
    const expectQuantity: number = (parseInt(getQuantity) + quantity)
    expect(getQuantityAfter === expectQuantity)
  })
})
