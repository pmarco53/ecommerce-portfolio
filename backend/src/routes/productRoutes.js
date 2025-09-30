import express from 'express'
const router = express.Router()

// Lista de produtos fictícios
const products = [
  { id: 1, name: 'Camiseta Premium', price: 99.9 },
  { id: 2, name: 'Tênis Esportivo', price: 249.9 },
  { id: 3, name: 'Relógio Clássico', price: 499.9 },
]

// GET /api/products
router.get('/', (req, res) => {
  res.json(products)
})

export default router
