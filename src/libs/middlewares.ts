import express from 'express'
import cors from 'cors'
import authRoutes from '../routes/auth.route'
import userRoutes from '../routes/user.route'
import productRoutes from '../routes/products.route'

const app = express()

app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: true
  })
)

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.get('/', (_req, res) => {
  res.status(200).send('WELCOME!!')
})

export default app
