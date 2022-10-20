/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { test, expect } from '@playwright/test'
import bcrypt from 'bcrypt'

test.describe('need auth', () => {
  test.beforeEach(async ({ request }) => {
    await request.post('http://localhost:5000/auth/login', {
      data: {
        email: 'Luis@gmail.com',
        password: '123'
      }
    })
  })

  test('All user', async ({ request }) => {
    const users = await request.get('http://localhost:5000/users')
    expect(users.ok()).toBeTruthy()
    expect(await users.json()).toContainEqual(
      expect.objectContaining({
        First_Name: 'Luis',
        Last_Name: 'Tejeda'
      })
    )
  })
  test('find user by id', async ({ request }) => {
    const id = 1
    const user = await request.get(`http://localhost:5000/users/${id}`)
    expect(user.ok()).toBeTruthy()
    expect(await user.json()).toHaveProperty('User_ID', id)
  })

  test('find user by email', async ({ request }) => {
    const email = 'test@gmail.com'
    const user = await request.get(`http://localhost:5000/users/find/${email}`)
    expect(user.ok()).toBeTruthy()
    expect(await user.json()).toHaveProperty('email', email)
  })

  test('Edit user', async ({ request }) => {
    const FirstName: string = 'Hansel'
    const LastName: string = 'Tejeda'
    const email: string = 'test@gmail.com'
    const emailToEdit: string = 'edit@gmail.com'
    const user = await request.get(`http://localhost:5000/users/find/${email}`)
    const parseUser = await user.json()
    const ID = parseUser.User_ID

    const res = await request.put(`http://localhost:5000/users/edit/${ID}`, {
      data: {
        First_Name: FirstName,
        Last_Name: LastName,
        email: emailToEdit,
        role: 'client',
        password: await bcrypt.hash('123', 8)
      }
    })
    expect(await res.text()).toContain('User Edit')
  })

  test('Delete user', async ({ request }) => {
    const email: string = 'edit@gmail.com'
    const user = await request.get(`http://localhost:5000/users/find/${email}`)
    const parseUser = await user.json()
    const ID = parseUser.User_ID
    const job = await request.delete(`http://localhost:5000/users/delete/${ID}`)
    const res = await job.text()
    expect(res).toContain('User deleted')
  })
})
