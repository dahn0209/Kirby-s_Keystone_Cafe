import React from 'react'
import {connect} from 'react-redux'
import {
  fetchCart,
  addItemToCartThunk,
  removeItemFromCartThunk,
  clearItemFromCartThunk,
  combineCartThunk
} from '../store/cart'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  constructor() {
    super()
    this.clickButton = this.clickButton.bind(this)
  }

  componentDidMount() {
    const {user, fetchUserCart, combineGuestCart} = this.props
    const isGuest = !user.id

    if (!isGuest) {
      // if the user is logged in, first check if a guest cart exists
      const preExistingCart = JSON.parse(window.localStorage.getItem('cart'))
      // if it does, send the cart to the database to be merged with the user's cart
      if (preExistingCart && preExistingCart.length) {
        combineGuestCart(preExistingCart)
      }
      // display the cart
      fetchUserCart(user.id)
    } else {
      // if they're a guest, fetch their catch from local storage
      fetchUserCart(JSON.parse(window.localStorage.getItem('cart')) || [])
    }
  }

  clickButton(clickedActionFunc, productId) {
    const {fetchUserCart, user} = this.props

    // grab local cart and update cart based on button clicked
    let cart = JSON.parse(window.localStorage.getItem('cart'))

    if (cart !== null && cart.length) {
      cart = cart
        .map(item => {
          if (productId === item.id) {
            // convert total price and price in preparation for calculations
            item.totalPrice = parseInt(
              parseFloat(item.totalPrice, 10) * 100,
              10
            )
            item.price = parseInt(parseFloat(item.price, 10) * 100, 10)

            if (clickedActionFunc.name === 'increment') {
              item.quantity += 1
              // add price to total price and revert format
              item.totalPrice = ((item.totalPrice + item.price) / 100).toFixed(
                2
              )
            }
            if (clickedActionFunc.name === 'decrement') {
              item.quantity -= 1
              item.totalPrice = ((item.totalPrice - item.price) / 100).toFixed(
                2
              )
            }
            if (clickedActionFunc.name === 'clearFromCart') {
              item.quantity = 0
            }
          }
          // revert format of item price
          item.price = (item.price / 100).toFixed(2)
          return item
        })
        .filter(item => item.quantity > 0)
      window.localStorage.setItem('cart', JSON.stringify(cart))
    }

    if (user.id) {
      // if the user is logged in, perform the corresponding 'clicked' action and fetch their updated cart
      clickedActionFunc(productId)
    } else {
      // if the user is not logged in, then, update the state in redux
      fetchUserCart(cart)
    }
  }

  render() {
    const {increment, decrement, clearFromCart, cart} = this.props
    return (
      <div className="main-cart-wrapper">
        <div id="cart-left-panel">
          {cart.map(product => (
            <div key={product.id} className="item-in-cart">
              <b>{product.name}</b>
              <img src={product.imageUrl} />
              <div>
                quantity: {product.quantity || product.orderDetail.quantity}
              </div>
              <br />
              <b>
                price:{' '}
                {(product.totalPrice * 100 / 100).toFixed(2) ||
                  product.orderDetail.totalPrice}
              </b>
              <div>
                <br />
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
            </div>
          ))}
        </div>
        <div id="cart-right-panel">
          <Link to="/checkout">Checkout</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
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
    },
    combineGuestCart: guestCart => {
      dispatch(combineCartThunk(guestCart))
    }
  }
}

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default ConnectedCart
