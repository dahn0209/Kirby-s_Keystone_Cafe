const {db, Product, User, Cart, OrderDetail} = require('./server/db/models')

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      products.map(product => {
        return Product.create(product)
      })
    )

    await Promise.all(
      User.map(user => {
        return User.create(user)
      })
    )

    // seed your database here!
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed
