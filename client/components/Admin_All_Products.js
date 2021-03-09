import React from 'react'
import {
  adminFetchProducts,
  deleteProductThunk
} from '../store/admin_store/admin_products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class Admin_All_Products extends React.Component {
  componentDidMount() {
    this.props.adminFetchProducts()
    console.log(this.props)
  }

  render() {
    const products = this.props.adminProducts
    return (
      <div>
        <h1>All Products</h1>
        <h2>List of Product:</h2>
        <button type="button">Add Product</button>
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
  console.log('what is state ', state)
  return {
    adminProducts: state.adminProducts
  }
}

const mapDipatchToProps = dispatch => {
  return {
    adminFetchProducts: () => dispatch(adminFetchProducts()),
    deleteProductThunk: productId => dispatch(deleteProductThunk(productId))
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(Admin_All_Products)
