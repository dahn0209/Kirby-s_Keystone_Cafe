const router = require('express').Router()
const {User} = require('../db/models')

// /admin/users

router.get('/users', async (req, res, next) => {
  console.log('how bout this')
  try {
    console.log('did this log??')
    const users = await User.findAll()

    res.status(204).send(users)
  } catch (error) {
    console.log('hello?????')
    next(error)
  }
})

module.exports = router
