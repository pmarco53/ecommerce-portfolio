import express from 'express'
import Stripe from 'stripe'
//console.log(' aqui1')
const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

router.post('/create-checkout-session', async (req, res) => {
  console.log('👉 Rota /create-checkout-session foi chamada') // LOG DE TESTE

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: 'brl',
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    })

    console.log('✅ Sessão criada:', session.id) // LOG DE TESTE
    res.json({ url: session.url })
  } catch (err) {
    console.error('❌ Erro Stripe:', err.message)
    res.status(500).json({ error: err.message })
  }
})

router.get('/teste', (req, res) => {
  console.log('✅ Rota de teste chamada')
  res.send('Rota teste funcionando')
})

export default router
