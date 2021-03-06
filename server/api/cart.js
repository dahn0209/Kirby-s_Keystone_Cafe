const express = require('express')
const router = express.Router()
const {Product, Cart, OrderDetail} = require('../db/models/index')

// /api/cart/view
router.get('/view', async (req, res, next) => {
  try {
    if (!req.session.passport) {
      res.json('Not logged in but tried to hit the view cart route')
    } else {
      const userId = req.session.passport.user

      // if the person is a user
      const [userCart, cartWasCreated] = await Cart.findOrCreate({
        where: {userId: userId, processed: false},
        include: [{model: Product}]
      })

      let itemsInCart = userCart.products

      itemsInCart = itemsInCart.map(function(item) {
        item.orderDetail.totalPrice = (
          item.orderDetail.totalPrice / 100
        ).toFixed(2)
        return item
      })

      res.json(itemsInCart)
    }
  } catch (err) {
    next(err)
  }
})

// api/cart/addItem/:productId route
router.put('/addItem/:productId', async (req, res, next) => {
  try {
    // need to grab userId from req.session

    const userId = req.session.passport.user

    // grab productId from the req.params
    const productId = parseInt(req.params.productId, 10)

    // find the product in the database to verify it exists product
    const product = await Product.findByPk(productId)

    // find the user's active cart by using their userid
    const [userCart, cartWasCreated] = await Cart.findOrCreate({
      where: {userId: userId, processed: false}
    })

    // // once cart is found, find the orderDetails of that cart
    const [orderDetails, orderWasCreated] = await OrderDetail.findOrCreate({
      where: {productId: productId, cartId: userCart.id}
    })

    await orderDetails.update({
      productId: product.id,
      quantity: orderDetails.quantity + 1,
      totalPrice: product.price * (orderDetails.quantity + 1)
    })

    res.status(200).send('Successfully added to cart')
  } catch (err) {
    next(err)
  }
})

// api/cart/removeItem/:productId route
router.put('/removeItem/:productId', async (req, res, next) => {
  try {
    // need to grab userId from req.session
    const userId = req.session.passport.user

    // grab productId from the req.params
    const productId = parseInt(req.params.productId, 10)

    // find the product in the database to verify it exists product
    const product = await Product.findByPk(productId)

    // find the user's active cart by using their userid
    const userCart = await Cart.findOne({
      where: {userId: userId, processed: false}
    })

    // once cart is found, find the orderDetails of that cart
    const orderDetails = await OrderDetail.findOne({
      where: {productId: productId, cartId: userCart.id}
    })

    // update the order details
    await orderDetails.update({
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

// api/cart/clearItem/:productId route
router.put('/clearItem/:productId', async (req, res, next) => {
  try {
    // need to grab userId from req.session
    const userId = req.session.passport.user

    // grab productId from the req.params
    const productId = parseInt(req.params.productId, 10)

    // find the product in the database to verify it exists product
    const product = await Product.findByPk(productId)

    // find the user's active cart by using their userid
    const userCart = await Cart.findOne({
      where: {userId: userId, processed: false}
    })

    // once cart is found, find the orderDetails of that cart

    await OrderDetail.destroy({
      where: {productId: productId, cartId: userCart.id}
    })

    res.status(200).send('Successfully removed to cart')
  } catch (err) {
    next(err)
  }
})

module.exports = router
