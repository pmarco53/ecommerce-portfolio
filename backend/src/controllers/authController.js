import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'

export const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    )
    console.log(result)
    res.status(201).json({ user: result.rows[0] })
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ message: 'Email já registrado' })
    } else {
      res.status(500).json({ message: 'Erro interno' })
    }
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [
      email,
    ])
    if (result.rows.length === 0)
      return res.status(401).json({ message: 'Usuário não encontrado' })

    const user = result.rows[0]
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: 'Senha incorreta' })

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    })
  } catch (err) {
    res.status(500).json({ message: 'Erro interno' })
  }
}
