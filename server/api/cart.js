const express = require('express')
const router = express.Router()
const {Product, Cart, OrderDetail} = require('../db/models/index')

const formatPrice = itemArray => {
  itemArray = itemArray.map(function(item) {
    item.orderDetail.totalPrice = (item.orderDetail.totalPrice / 100).toFixed(2)
    return item
  })
  return itemArray
}

// /api/cart/view
router.get('/view', async (req, res, next) => {
  try {
    if (!req.session.passport) {
      // protect against against bad actors trying to view unauthorized carts
      res.json("Not logged in but tried to view a user's cart!")
    } else {
      const userId = req.session.passport.user

      // // if the person is a user
      const [userCart] = await Cart.findOrCreate({
        where: {userId: userId, processed: false},
        include: [{model: Product}]
      })

      let itemsInCart = formatPrice(userCart.products || [])

      res.json(itemsInCart)
    }
  } catch (err) {
    next(err)
  }
})

// api/cart/addItem/:productId route
router.put('/addItem/:productId', async (req, res, next) => {
  try {
    // grab userId from req.session
    const userId = req.session.passport.user

    // grab productId from the req.params
    const productId = parseInt(req.params.productId, 10)

    // find the product in the database to verify it exists product
    const product = await Product.findByPk(productId)

    if (!product) {
      res.send('Product does not exist!')
    } else {
      // find the user's active cart by using their userid
      const [userCart] = await Cart.findOrCreate({
        where: {userId: userId, processed: false}
      })

      // // once cart is found, find the orderDetails of that cart
      const [orderDetails] = await OrderDetail.findOrCreate({
        where: {productId: productId, cartId: userCart.id}
      })

      // update the entry in OrderDetails
      await orderDetails.update({
        productId: product.id,
        quantity: orderDetails.quantity + 1,
        totalPrice: product.price * (orderDetails.quantity + 1)
      })

      // grab and send the updated cart to be dispatched to the store
      const updatedCart = await Cart.findOne({
        where: {userId: userId, processed: false},
        include: [{model: Product}]
      })

      let itemsInCart = formatPrice(updatedCart.products)

      res.json(itemsInCart)
    }
  } catch (err) {
    next(err)
  }
})

// api/cart/removeItem/:productId route
router.put('/removeItem/:productId', async (req, res, next) => {
  try {
    // grab userId from req.session
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

    // delete the record if item is no longer needed
    if (orderDetails.quantity === 0) {
      await orderDetails.destroy()
    }

    // grab and send the updated cart to be dispatched to the store
    const updatedCart = await Cart.findOne({
      where: {userId: userId, processed: false},
      include: [{model: Product}]
    })

    let itemsInCart = formatPrice(updatedCart.products)

    res.json(itemsInCart)
  } catch (err) {
    next(err)
  }
})

// api/cart/clearItem/:productId route
router.put('/clearItem/:productId', async (req, res, next) => {
  try {
    // grab userId from req.session
    const userId = req.session.passport.user

    // grab productId from the req.params
    const productId = parseInt(req.params.productId, 10)

    // find the user's active cart by using their userid
    const userCart = await Cart.findOne({
      where: {userId: userId, processed: false}
    })

    // once cart is found, find the orderDetails of that cart
    await OrderDetail.destroy({
      where: {productId: productId, cartId: userCart.id}
    })

    // grab and send the updated cart to be dispatched to the store
    const updatedCart = await Cart.findOne({
      where: {userId: userId, processed: false},
      include: [{model: Product}]
    })

    let itemsInCart = formatPrice(updatedCart.products)

    res.json(itemsInCart)
  } catch (err) {
    next(err)
  }
})

// api/cart/combinecart
router.put('/combinecart', async (req, res, next) => {
  try {
    const guestCart = req.body
    const userId = req.session.passport.user

    // find the user's active cart
    const userCart = await Cart.findOne({
      where: {userId: userId, processed: false}
    })

    for (let i = 0; i < guestCart.length; i++) {
      let item = guestCart[i]

      // find the product's information
      const product = await Product.findByPk(item.id)

      item = {
        productId: product.id,
        quantity: item.quantity,
        totalPrice: product.price * item.quantity,
        cartId: userCart.id
      }

      // find or create the order (if it doesn't exist)
      const [order] = await OrderDetail.findOrCreate({
        where: {productId: item.productId, cartId: item.cartId}
      })

      // update the order details
      await order.update({
        quantity: item.quantity,
        totalPrice: item.totalPrice
      })
    }

    // grab the updated cart to be sent back
    const updatedCart = await Cart.findOne({
      where: {userId: userId, processed: false},
      include: [{model: Product}]
    })

    let itemsInCart = formatPrice(updatedCart.products)

    res.json(itemsInCart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
