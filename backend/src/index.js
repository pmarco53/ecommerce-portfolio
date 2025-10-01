import express from 'express'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/products', productRoutes)

router.post('/register', register)

const PORT = process.env.PORT || 5002
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`))
