import React from 'React'
import {createNewProduct} from '../store/admin_store/admin_products'
import {connect} from 'react-redux'

const defaultState = {
  name: '',
  description: '',
  price: ''
}

class AddProductForm extends React.Component {
  constructor() {
    super()
    this.state = defaultState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    console.log('???????')
    event.preventDefault()
    console.log('logging?')
    this.props.createNewProduct({...this.state})
    console.log('hello')
    this.setState(defaultState)
  }

  render() {
    const {name, description, price} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>New Product Details</h1>

          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Product Name"
            onChange={this.handleChange}
          />

          <label htmlFor="description">Product Description</label>
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Product Description"
            onChange={this.handleChange}
          />

          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            value={price}
            placeholder="Price"
            onChange={this.handleChange}
          />
          <button type="submit">Add New Product</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    newProduct: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    createNewProduct: product => dispatch(createNewProduct(product))
  }
}

export default connect(mapState, mapDispatch)(AddProductForm)
