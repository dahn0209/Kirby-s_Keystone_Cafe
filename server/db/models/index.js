const db = require('../db')
const User = require('./user')
const Product = require('./product')
const OrderDetail = require('./orderDetail')
const Cart = require('./cart')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//has one order or has many orders?
User.hasOne(Cart)
Cart.belongsTo(User)

Product.belongsToMany(Cart, {through: 'OrderDetail'})
Cart.belongsToMany(Product, {through: 'OrderDetail'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  db,
  User,
  Product,
  OrderDetail,
  Cart
}
