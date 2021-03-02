const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetail = db.define('orderDetail', {
  price: {
    type: Sequelize.FLOAT
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderDetail
