const {db, Product, User, Cart, OrderDetail} = require('../server/db/models')
const users = require('../listOfUsers')

const products = [
  {
    name: 'smash ball',
    description: 'unlocks final smash',
    imageUrl: 'https://www.ssbwiki.com/images/a/a2/SSBU_spirit_Smash_Ball.png',
    price: 500,
    rating: 5.0
  },
  {
    name: 'blast box',
    description: 'send your enemies flying, but be careful!',
    imageUrl:
      'https://www.ssbwiki.com/images/thumb/4/46/BlastBox.jpg/250px-BlastBox.jpg',
    price: 250,
    rating: 2.8
  },
  {
    name: 'maxim tomato',
    description: 'get your daily requirement of veggies',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYqDhfz2N1nKR9E9Lt4YbquzPmZNOtguUOdA&usqp=CAU',
    price: 300,
    rating: 3.5
  },
  {
    name: 'bunny hood',
    description: 'move faster than the wild!',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKzpkFIgj1pPrzT91FyG9xS1XfqDeL2VzekA&usqp=CAU',
    price: 250,
    rating: 4.2
  }
]

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
