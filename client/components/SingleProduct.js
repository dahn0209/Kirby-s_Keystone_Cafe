import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addItemToCartThunk} from '../store/cart'

class SingleProduct extends React.Component {
  componentDidMount() {
    console.log('CDM before')
    this.props.loadSingleProduct(this.props.match.params.productId)
    console.log('CDM after')
  }

  render() {
    const {product, addToCart} = this.props
    console.log('Product is: ', product)
    return product ? (
      <div>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} alt={product.name} />
        <p>{product.description}</p>
        <br />
        <span>{product.rating}</span>
        <h4>{product.price}</h4>
        <button
          type="button"
          onClick={() => {
            addToCart(product.id)
          }}
        >
          Add to cart
        </button>
      </div>
    ) : (
      <div>Loading..</div>
    )
  }
}

const mapState = state => {
  console.log('MS: ', state)
  return {
    product: state.singleProductReducer
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
