import React from 'react'
import {connect} from 'react-redux'
import {fetchCheckout} from '../store/checkout'

class Checkout extends React.Component {
  componentDidMount() {
    this.props.loadCheckout()
  }

  render() {
    const {user, userCart} = this.props.checkout

    if (!user) {
      return <div>loading</div>
    } else {
      return (
        <div>
          <h1>Confirm your details before submitting</h1>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <h3>Current Order:</h3>
          {userCart.products.map(product => (
            <div key={product.id}>
              <h4>{product.name}</h4>
              <br />
              <span>Quantity {product.orderDetail.quantity} </span>
              <span>Total {product.orderDetail.totalPrice / 100}</span>
            </div>
          ))}
          <h4>Total</h4>
          <h3>
            {userCart.products.reduce((total, curr) => {
              return total + curr.orderDetail.totalPrice
            }, 0) / 100}
          </h3>

          <button type="submit">Submit Order</button>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    checkout: state.checkout
  }
}

const mapDispatch = dispatch => {
  return {
    loadCheckout: () => dispatch(fetchCheckout())
  }
}

export default connect(mapState, mapDispatch)(Checkout)
