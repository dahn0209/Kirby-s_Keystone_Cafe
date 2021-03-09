import React from 'react'
import {connect} from 'react-redux'
import {fetchCheckoutConfirm} from '../store/checkout'

class Confirmation extends React.Component {
  componentDidMount() {
    this.props.loadConfirmation()
  }
  render() {
    return (
      <div>
        <h1>Congratulations! Your Order has been received!</h1>
      </div>
    )
  }
}

const mapState = state => {
  return {
    checkout: state.checkout
  }
}

const mapDispatch = dispatch => {
  return {
    loadConfirmation: () => dispatch(fetchCheckoutConfirm())
  }
}

export default connect(mapState, mapDispatch)(Confirmation)
