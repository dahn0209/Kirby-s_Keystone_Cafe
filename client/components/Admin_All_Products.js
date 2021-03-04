import React from 'react'
import {fetchProducts} from '../store/admin_store/admin_products'
import {connect} from 'react-redux'

export class Admin_All_Products extends React.Component {
  constructor() {
    super()
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
        <button>Add Product</button>
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
                <div>
                  <button>Edit</button>
                  <button>Remove</button>
                </div>
              </div>
            </div>
          )
        })}
        <div />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDipatchToProps = dispatch => {
  return {
    getProducts: () => {
      return dispatch(fetchProducts())
    }
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(Admin_All_Products)