import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addItemToCartThunk} from '../store/cart'

class SingleProduct extends React.Component {
  constructor() {
    super()

    this.handleAdd = this.handleAdd.bind(this)
  }
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId)
  }

  handleAdd() {
    const {user, product, addToCart} = this.props
    if (user.id) {
      addToCart(product.id)
      alert('Added to cart')
    } else {
      if (localStorage.getItem('cart') === null) {
        let cartArray = []
        product.quantity = 1
        cartArray.push(product)
        cartArray = JSON.stringify(cartArray)
        localStorage.setItem('cart', cartArray)
        alert('Added to cart')
      } else {
        let currentItems = localStorage.getItem('cart')

        currentItems = JSON.parse(currentItems)

        if (
          !currentItems.some(currentProduct => currentProduct.id === product.id)
        ) {
          product.quantity = 1
          currentItems.push(product)
          alert('Added to cart')
        } else {
          currentItems.map(currentProduct => {
            if (product.id === currentProduct.id) {
              currentProduct.quantity += 1
            }
            return currentProduct
          })
          alert('Added to cart')
        }

        let newCart = JSON.stringify(currentItems)

        localStorage.setItem('cart', newCart)
      }
      // if the cart exists, we need to get the current value in the cart. then json parse, then push our product id into the array, and then json stringify it and set it back into our cart in local storage
    }
  }

  render() {
    const {product} = this.props

    return product.name ? (
      <div>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} alt={product.name} />
        <p>{product.description}</p>
        <br />
        <h4>{product.price}</h4>
        <button type="button" onClick={this.handleAdd}>
          Add to cart
        </button>
      </div>
    ) : (
      <div>Product Not Found!</div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProductReducer,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addToCart: productId => {
      dispatch(addItemToCartThunk(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
