import React from 'react'
import {updateProductThunk} from '../store/admin_store/admin_products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleProduct} from '../store/singleProduct'

const defaultState = {
  name: '',
  description: '',
  price: ''
}

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = defaultState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.fetchSingleProduct(productId)
    console.log('props on edit ', this.props)
    const {name, description, price, id} = this.props.updatedProduct
    if (productId) {
      console.log('IDDDDD')
      this.setState({
        name,
        price,
        description
      })
    }
  }

  componentDidUpdate(prevProps) {
    const {name, price, description, id} = this.props.updatedProduct
    if (!prevProps.updatedProduct.id && id) {
      this.setState({
        name,
        price,
        description
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.updateProductThunk({
      ...this.props.updatedProduct,
      ...this.state
    })
  }

  render() {
    const {name, price, description} = this.state
    return (
      <div className="form">
        <h1>Edit Product Form</h1>
        <div>
          <h3>THIS INFORMATION WILL BE SAVED UPON SUBMIT:</h3>
          <p>Name: {name}</p>
          <p>Description: {description}</p>
          <p>Price: {price}</p>
        </div>
        <h3>Please enter new product information below</h3>
        <form id="add-product-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="name of product"
            onChange={this.handleChange}
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            placeholder="product description"
            onChange={this.handleChange}
          />

          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            value={price}
            placeholder="price"
            onChange={this.handleChange}
          />

          <button type="submit" className="submit-button">
            Submit
          </button>
          <Link to="/admin/products">
            <button className="delete-button">Cancel</button>
          </Link>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    updatedProduct: state.singleProductReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProductThunk: product => dispatch(updateProductThunk(product)),
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
