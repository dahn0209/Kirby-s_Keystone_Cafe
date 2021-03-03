const router = require('express').Router()
const {User, Product} = require('../db/models')

// --------- routes for: api/admin/user -----------

// api/admin/users
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.status(204).json(users)
  } catch (error) {
    next(error)
  }
})

// /api/admin/users/id
router.get('/users/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await User.findByPk(userId)

    //if user doesn't exist
    if (!user) {
      console.log('user not found in GET /api/admin/user/id')
      res.status(404).send('This user does not exist in our database')
    } else {
      res.status(200).json(user)
    }
  } catch (error) {
    next(error)
  }
})

// --------- routes for: api/admin/products -----------

// /api/admin/products
router.post('/products', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.send(product)
  } catch (error) {
    next(error)
  }
})

// /api/admin/products/:id
router.put('/products/:id', async (req, res, next) => {
  try {
    const productId = req.params.id
    const product = await Product.findByPk(productId)

    res.send(await product.update(req.body))
  } catch (error) {
    next(error)
  }
})

// /api/admin/products/:id
router.delete('/products/:id', async (req, res, next) => {
  try {
    const productId = req.params.id
    const product = await Product.findByPk(productId)

    if (!product) {
      res.sendStatus(404)
    } else {
      await product.destroy()
      res.send(product)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
