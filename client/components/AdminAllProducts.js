import React from 'react'
import {
  adminFetchProducts,
  deleteProductThunk
} from '../store/admin_store/admin_products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddProductForm from './AddProductForm'

export class AdminAllProducts extends React.Component {
  componentDidMount() {
    this.props.adminFetchProducts()
  }

  render() {
    const products = this.props.adminProducts
    return (
      <div>
        <AddProductForm />
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
                <h3>Price:{product.price / 100}</h3>
                <div>
                  <Link to={`/admin/products/${product.id}/edit`}>
                    <button type="button">Edit Product</button>
                  </Link>

                  <button
                    type="button"
                    onClick={() => this.props.deleteProductThunk(product)}
                  >
                    Remove Product
                  </button>
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
    adminProducts: state.adminProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    adminFetchProducts: () => dispatch(adminFetchProducts()),
    deleteProductThunk: productId => dispatch(deleteProductThunk(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAllProducts)
