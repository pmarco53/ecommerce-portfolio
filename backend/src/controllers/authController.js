// authController.js
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import pool from '../config/db.js' // seu arquivo de conexão com PostgreSQL

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'

// Registrar usuário
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    // Verifica se usuário já existe
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Usuário já existe' })
    }

    // Criptografa senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insere usuário no banco
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    )

    const user = result.rows[0]

    // Cria token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1d',
    })

    res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erro no servidor' })
  }
}

// Login usuário
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])
    const user = result.rows[0]

    if (!user)
      return res.status(400).json({ message: 'Usuário não encontrado' })

    // Verifica senha
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' })

    // Cria token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1d',
    })

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erro no servidor' })
  }
}
