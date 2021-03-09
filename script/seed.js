const {db, Product, User, Cart, OrderDetail} = require('../server/db/models')
const users = require('./listOfUsers')
const products = require('./listOfProducts')
const carts = require('./listOfCarts')
const orderDetails = require('./listOfOrderDetails')

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      products.map(product => {
        return Product.create(product)
      })
    )

    await Promise.all(
      users.map(user => {
        return User.create(user)
      })
    )

    await Promise.all(
      carts.map(cart => {
        return Cart.create(cart)
      })
    )

    await Promise.all(
      orderDetails.map(orderDetail => {
        return OrderDetail.create(orderDetail)
      })
    )

    console.log('seeding done!')
    // seed your database here!
  } catch (err) {
    console.log(err)
  }
}

module.exports = seed

if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!')
      db.close()
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
      db.close()
    })
}
