import React from 'react'
import {connect} from 'react-redux'
import {
  fetchCart,
  addItemToCartThunk,
  removeItemFromCartThunk,
  clearItemFromCartThunk
} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()

    this.clickButton = this.clickButton.bind(this)
  }
  componentDidMount() {
    const {user, fetchUserCart} = this.props
    const isGuest = !user.id

    if (!isGuest) {
      console.log('fetching user cart')
      // fetch cart from db
      fetchUserCart(user.id)
    } else {
      fetchUserCart(JSON.parse(window.localStorage.getItem('cart')))
    }
  }

  clickButton(clickedActionFunc, productId) {
    const {fetchUserCart, user} = this.props

    if (user.id) {
      // if the user is logged in, perform the corresponding action and fetch their updated cart
      clickedActionFunc(productId)
      fetchUserCart(user.id)
    } else {
      // if the user is not logged in, grab the cart from local storage and update the values within the cart and update the state in redux
      let cart = JSON.parse(window.localStorage.getItem('cart'))
      cart = cart
        .map(item => {
          if (productId === item.id) {
            if (clickedActionFunc.name === 'increment') {
              item.quantity += 1
              item.price += parseInt(item.price, 10)
            }
            if (clickedActionFunc.name === 'decrement') {
              item.quantity -= 1
              item.price += item.price
            }
            if (clickedActionFunc.name === 'clearFromCart') {
              item.quantity = 0
            }
          }
          return item
        })
        .filter(item => item.quantity > 0)
      window.localStorage.setItem('cart', JSON.stringify(cart))
      fetchUserCart(cart)
    }
  }

  render() {
    const {increment, decrement, clearFromCart, user, cart} = this.props

    const isGuest = !user.id

    console.log('isGuest: ', isGuest)
    console.log('user: ', user)
    console.log('get the cart: ', cart)

    return (
      <div className="main-cart-wrapper">
        <div id="cart-left-panel">
          {cart.map(product => (
            <div key={product.id} className="itemInCart">
              <div>{product.name}</div>
              <img src={product.imageUrl} />
              <div>
                quantity:{' '}
                {isGuest ? product.quantity : product.orderDetail.quantity}
              </div>
              <div>
                price:{' '}
                {isGuest ? product.price : product.orderDetail.totalPrice}
              </div>
              <button
                type="button"
                onClick={() => this.clickButton(decrement, product.id)}
              >
                -
              </button>
              <button
                type="button"
                onClick={() => this.clickButton(increment, product.id)}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => this.clickButton(clearFromCart, product.id)}
              >
                Remove Item
              </button>
            </div>
          ))}
        </div>
        <div id="cart-right-panel">
          CheckoutPage
          {/* put total and summary details and checkout button in this panel */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log('MS CART: ', state)
  return {
    cart: state.cart,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchUserCart: userOrCart => {
      dispatch(fetchCart(userOrCart))
    },
    increment: productId => {
      dispatch(addItemToCartThunk(productId))
    },
    decrement: productId => {
      dispatch(removeItemFromCartThunk(productId))
    },
    clearFromCart: productId => {
      dispatch(clearItemFromCartThunk(productId))
    }
  }
}

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default ConnectedCart
