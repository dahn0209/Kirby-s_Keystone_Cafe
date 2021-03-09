import React from 'react'
import {connect} from 'react-redux'
import {fetchCheckoutConfirm} from '../store/checkout'

class Confirmation extends React.Component {
  render() {
    return (
      <div>
        <h1>Congratulations! Your Order has been received!</h1>
      </div>
    )
  }
}

export default Confirmation
