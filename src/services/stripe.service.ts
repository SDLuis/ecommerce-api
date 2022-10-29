/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Stripe from 'stripe'
import { Request, Response } from 'express'

const stripe = new Stripe('sk_test_51Ly3S2LG2eOABxM7LpJhX1OJswWOLpCYTaWaZAoDGjTC2azO7FtGrbTpBHHUoCkARcoVg9OCDx5dKkFgZdxsSFV700GBIHZP3F', { apiVersion: '2022-08-01' })

export default async function handler (req: Request, res: Response): Promise<any> {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1Ly3xfLG2eOABxM79AgVAlWw' }
        ],
        line_items: req.body.map((item: any) => {
          const image = item.img

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.Product_Name,
                images: [image]
              },
              unit_amount: item.price * 100
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`
      }

      const session = await stripe.checkout.sessions.create(params as any)

      res.status(200).json(session)
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.send('Method Not Allowed')
  }
}

export async function buySingleItem (req: Request, res: Response): Promise<any> {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1Ly3xfLG2eOABxM79AgVAlWw' }
        ],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: req.body.Product_Name,
                images: [req.body.img]
              },
              unit_amount: req.body.price * 100
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1
            },
            quantity: req.body.quantity
          }],

        success_url: `${req.headers.origin}/successful`,
        cancel_url: `${req.headers.origin}/canceled`
      }

      const session = await stripe.checkout.sessions.create(params as any)

      res.status(200).json(session)
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.send('Method Not Allowed')
  }
}
