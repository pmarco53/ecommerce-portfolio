import express from 'express'
import pool from '../config/db.js'
const router = express.Router()

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar produtos' })
  }
})

export default router
