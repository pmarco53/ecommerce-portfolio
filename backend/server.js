import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Rotas de teste
app.get('/', (req, res) => {
  res.send('API da Loja Virtual rodando 🚀')
})

// Rotas básicas (a implementar)
import productRoutes from './src/routes/productRoutes.js'
app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5002
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
