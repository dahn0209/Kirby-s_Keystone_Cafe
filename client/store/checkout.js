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

export const fetchCheckout = userOrCart => {
  return async dispatch => {
    try {
      if (typeof userOrCart === 'number') {
        const {data} = await axios.get(`/api/checkout`)
        dispatch(setCheckout(data))
      } else {
        dispatch(setCheckout(userOrCart))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchCheckoutConfirm = () => {
  return async dispatch => {
    try {
      console.log('are we hitting this? REDUX ')
      const {data} = await axios.get(`/api/checkout/confirmation`)
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
