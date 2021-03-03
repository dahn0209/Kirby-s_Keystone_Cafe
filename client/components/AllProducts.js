import React from 'react'
import {fetchProducts} from '..store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  constructor() {
    super()

    this.handleAllProducts = this.handleAllProducts.bind(this)
  }
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <h1>All Products</h1>
        <h2>List of Product:</h2>
        {products.map(product => {
          return (
            <div className="all-product-list" key={product.id}>
              <div>
                <Link to={`/products/${product.id}`}>
                  <h2>{product.name}</h2>
                  <img src={product.imageUrl} />
                </Link>
                <p>{product.description}</p>
                <h3>{product.rating}</h3>
              </div>
            </div>
          )
        })}
        <div />
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => {
      return dispatch(fetchProducts())
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
