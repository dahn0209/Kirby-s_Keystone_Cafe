const express = require('express')
const router = express.Router()
const {Product, Cart, OrderDetail} = require('../db/index')

// /cart/addItem/:productId route
router.put('/addItem/:productId', async (req, res, next) => {
  try {
    // need to grab userId from req.session
    const userId = req.session.passport.user

    // grab productId from the req.params
    const productId = req.params.productId

    // find the product in the database to verify it exists product
    const product = Product.findByPk(productId)
    // find the user's active cart by using their userid
    const userCart = Cart.findOrCreate({where: {userId: userId}})

    // once cart is found, find the orderDetails of that cart
    const orderDetails = OrderDetail.findOneOrCreate({
      where: {cartId: userCart.id}
    })

    await orderDetails.update({
      where: {productId: productId, cartId: userCart.id},
      quantity: this.quantity + 1
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
