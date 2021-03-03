const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetail = db.define('orderDetail', {
  price: {
    type: Sequelize.FLOAT,
    defaultValue: 0.0
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
})

module.exports = OrderDetail
