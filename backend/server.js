import express from 'express'
import cors from 'cors'
import authRoutes from './src/routes/auth.js'
import productsRoutes from './src/routes/productRoutes.js'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.json())

app.use('/api/auth', authRoutes)

app.use('/api/products', productsRoutes)

app.listen(5002, () => console.log('Backend rodando na porta 5002'))
