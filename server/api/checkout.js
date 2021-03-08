const express = require('express')
const router = express.Router()
const {Product, OrderDetail, Cart, User} = require('../db/models/index')

router.get('/', async (req, res, next) => {
  const userId = req.session.passport.user
  try {
    const [userCart, cartWasCreated] = await Cart.findOrCreate({
      where: {userId: userId, processed: false},
      include: [{model: Product}]
    })
    const user = await User.findByPk(userId)
    const checkout = {
      user,
      userCart
    }
    res.json(checkout)
  } catch (err) {
    next(err)
  }
})

router.get('/confirmation', async (req, res, next) => {
  const userId = req.session.passport.user
  try {
    const cart = await Cart.findOne({
      where: {
        userId: userId
      }
    })

    cart.processed = true
    await cart.save()

    res.status(202).send(cart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
