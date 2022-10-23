import express from 'express'
import cors from 'cors'
import authRoutes from '../routes/auth.route'
import userRoutes from '../routes/user.route'
import productRoutes from '../routes/products.route'
import cartRouter from '../routes/cart.route'
import cookieparser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dw9esmd56',
  api_key: '815338661929234',
  api_secret: 'bx5L7NxpAxw2jvnlJ0nSVdLx_eE'
})

const app = express()

app.use(express.static('./public'))
app.use(express.json())
app.use(cookieparser())
app.use(
  cors({
    credentials: true,
    origin: true
  })
)

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRouter)
app.get('/', (_req, res) => {
  res.status(200).send('WELCOME!!')
})

export default app
