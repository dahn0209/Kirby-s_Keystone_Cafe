const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.mariowiki.com/images/thumb/5/5b/Home-Run_Bat_Brawl_artwork.png/1200px-Home-Run_Bat_Brawl_artwork.png'
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  rating: {
    type: Sequelize.FLOAT,
    validate: {
      isDecimal: true,
      min: 0.0,
      max: 5.0
    }
  }
})

module.exports = Product
