import axios from 'axios'

const initialState = {}

const SET_CHECKOUT = 'SET_CHECKOUT'

const GET_CHECKOUT_CONFIRM = 'GET_CHECKOUT_CONFIRM'

export const setCheckout = checkout => {
  return {
    type: SET_CHECKOUT,
    checkout
  }
}

export const getCheckoutConfirm = cart => {
  return {
    type: GET_CHECKOUT_CONFIRM,
    cart
  }
}

export const fetchCheckout = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/checkout')
      dispatch(setCheckout(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchCheckoutConfirm = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/checkout/confirmation')
      dispatch(getCheckoutConfirm(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHECKOUT:
      return action.checkout
    case GET_CHECKOUT_CONFIRM:
      return action.cart
    default:
      return state
  }
}
