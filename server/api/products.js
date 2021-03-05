const router = require('express').Router()
const {Product} = require('../db/models')

// <-- assumes main route to products set up with app.use in index.js -->  //

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    allProducts.map(product => {
      product.price = (product.price / 100).toFixed(2)
      return product
    })
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)

    if (product) {
      product.price = (product.price / 100).toFixed(2)
      res.json(product)
    } else {
      res.status(404).send('product not found')
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
