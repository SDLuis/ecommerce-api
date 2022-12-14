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

test('register', async ({ request }) => {
  const FirstName: string = 'Luis'
  const LastName: string = 'Tejeda'
  const email: string = 'test@gmail.com'
  const user = await request.post('http://localhost:5000/auth/register', {
    data: {
      First_Name: FirstName,
      Last_Name: LastName,
      email,
      password: 123
    }
  })
  const res = JSON.parse(await user.text())
  expect(res).toHaveProperty('First_Name', FirstName)
  expect(res).toHaveProperty('Last_Name', LastName)
})

test('login', async ({ request }) => {
  const login = await request.post('http://localhost:5000/auth/login', {
    data: {
      email: 'luis@gmail.com',
      password: '123'
    }
  })
  const res = JSON.parse(await login.text())
  expect(res).toHaveProperty('loggedMessage', 'U RE LOGED')
})
