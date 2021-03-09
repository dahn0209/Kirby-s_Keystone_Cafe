const router = require('express').Router()
const {User, Product} = require('../db/models')

async function checkAdmin(req, res, next) {
  // checks if someone is logged in
  if (req.session.passport) {
    // this userId is only accessible if someone is logged in
    const userId = req.session.passport.user
    const {isAdmin} = await User.findByPk(userId)
    if (isAdmin) {
      //if logged-in user IS an admin
      next()
    } else {
      // if logged-in user is NOT an admin
      res.status(403).json({
        message: 'Access Denied'
      })
    }
  } else {
    // this block runs when nobody is logged in
    res.status(403).json({
      message: 'Access Denied'
    })
  }
}

// --------- routes for: api/admin/user -----------

// api/admin/users
router.get('/users', checkAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
})

// /api/admin/users/id
router.get('/users/:id', checkAdmin, async (req, res, next) => {
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
router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

// /api/admin/products
router.post('/products', checkAdmin, async (req, res, next) => {
  try {
    req.body.price = req.body.price * 100
    const product = await Product.create(req.body)

    res.send(product)
  } catch (error) {
    next(error)
  }
})

// /api/admin/products/:id
router.put('/products/:id', checkAdmin, async (req, res, next) => {
  try {
    const productId = req.params.id
    const product = await Product.findByPk(productId)
    req.body.price = req.body.price * 100
    res.send(await product.update(req.body))
  } catch (error) {
    next(error)
  }
})

// /api/admin/products/:id
router.delete('/products/:id', checkAdmin, async (req, res, next) => {
  try {
    const productId = req.params.id
    const product = await Product.findByPk(productId)

    if (!product) {
      res.sendStatus(404)
    }
    await product.destroy()
    res.send(product)
  } catch (error) {
    next(error)
  }
})

module.exports = router
