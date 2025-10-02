import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'

const protect = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Não autorizado' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' })
  }
}

export default protect
