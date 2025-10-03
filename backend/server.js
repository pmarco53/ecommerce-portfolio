import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './src/routes/auth.js'
import productsRoutes from './src/routes/productRoutes.js'
import checkoutRoutes from './src/routes/checkoutRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.use('/api/products', productsRoutes)

app.use('/api/checkoutRoutes', checkoutRoutes)

app.listen(5002, () => console.log('Backend rodando na porta 5002'))
