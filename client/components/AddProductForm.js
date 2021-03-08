import React from 'React'
import {createNewProduct} from '../store/admin_store/admin_products'
import {connect} from 'react-redux'

const defaultState = {
  name: '',
  descriptions: '',
  price: 0
}

class AddProductForm extends React.Component {
  constructor() {
    super()
    this.state = defaultState
  }

  render() {
    return (
      <div>
        <form>
          <h1>New Product Form</h1>
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
