const express = require('express')
const router = express.Router()
const {Product, Cart, OrderDetail} = require('../db/models/index')

// /cart/view
router.get('/view', async (req, res, next) => {
  try {
    if (!req.session.passport) {
      const sessionId = req.sessionID
      const [userCart, cartWasCreated] = await Cart.findOrCreate({
        where: {sessionId: sessionId}
      })
      const orderDetails = await OrderDetail.findAll({
        where: {cartId: userCart.id}
      })
      res.json(orderDetails)
    } else {
      const userId = req.session.passport.user

      // if the person is a user
      const [userCart, cartWasCreated] = await Cart.findOrCreate({
        where: {userId: userId}
      })

      const orderDetails = await OrderDetail.findAll({
        where: {cartId: userCart.id}
      })

      res.json(orderDetails)
    }
  } catch (err) {
    next(err)
  }
})

// /cart/addItem/:productId route
router.put('/addItem/:productId', async (req, res, next) => {
  try {
    // need to grab userId from req.session
    const userId = req.session.passport.user
    // const userId = 1
    // console.log(userId)
    // // grab productId from the req.params
    const productId = parseInt(req.params.productId, 10)

    // // find the product in the database to verify it exists product
    const product = await Product.findByPk(productId)
    // console.log('PRODUCT: ', product)
    // // find the user's active cart by using their userid

    const [userCart, cartWasCreated] = await Cart.findOrCreate({
      where: {userId: userId}
    })

    // // once cart is found, find the orderDetails of that cart

    const [orderDetails, orderWasCreated] = await OrderDetail.findOrCreate({
      where: {productId: productId, cartId: userCart.id}
    })

    await orderDetails.update({
      where: {productId: productId, cartId: userCart.id},
      productId: product.id,
      quantity: orderDetails.quantity + 1,
      totalPrice: product.price * (orderDetails.quantity + 1)
    })

    res.status(200).send('Successfully added to cart')
  } catch (err) {
    next(err)
  }
})

// /cart/removeItem/:productId route
router.put('/removeItem/:productId', async (req, res, next) => {
  try {
    // need to grab userId from req.session
    const userId = req.session.passport.user
    // const userId = 1
    // console.log(userId)
    // // grab productId from the req.params
    const productId = parseInt(req.params.productId, 10)

    // // find the product in the database to verify it exists product
    const product = await Product.findByPk(productId)
    // console.log('PRODUCT: ', product)
    // // find the user's active cart by using their userid

    const userCart = await Cart.findOne({
      where: {userId: userId}
    })

    // // once cart is found, find the orderDetails of that cart

    const orderDetails = await OrderDetail.findOne({
      where: {productId: productId, cartId: userCart.id}
    })

    await orderDetails.update({
      where: {productId: productId, cartId: userCart.id},
      productId: product.id,
      quantity: orderDetails.quantity - 1,
      totalPrice: product.price * (orderDetails.quantity - 1)
    })

    if (orderDetails.quantity === 0) {
      await orderDetails.destroy()
    }

    res.status(200).send('Successfully removed to cart')
  } catch (err) {
    next(err)
  }
})

module.exports = router
