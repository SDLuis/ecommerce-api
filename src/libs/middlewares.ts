import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (_req, res) => {
  res.status(200).send('WELCOME!!')
})

export default app
