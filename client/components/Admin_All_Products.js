import React from 'react'
import {adminFetchProducts} from '../store/admin_store/admin_products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class Admin_All_Products extends React.Component {
  componentDidMount() {
    this.props.adminGetProducts()
  }

  render() {
    const products = this.props.adminProducts
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
                <h3>Price:{product.price}</h3>
                <div>
                  <button>Edit Product</button>
                  <button>Remove Product</button>
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
    adminProducts: state.products
  }
}

const mapDipatchToProps = dispatch => {
  return {
    adminGetProducts: () => {
      return dispatch(adminFetchProducts())
    }
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(Admin_All_Products)
