import axios from 'axios'

const initialState = []

const SET_CART = 'SET_CART'

export const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

export const addItemToCartThunk = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/addItem/${productId}`)
      dispatch(setCart(data))
    } catch (err) {
      throw err
    }
  }
}

export const clearItemFromCartThunk = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/clearItem/${productId}`)
      dispatch(setCart(data))
    } catch (err) {
      throw err
    }
  }
}

export const removeItemFromCartThunk = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/removeItem/${productId}`)
      dispatch(setCart(data))
    } catch (err) {
      throw err
    }
  }
}

export const fetchCart = userOrCart => {
  return async dispatch => {
    try {
      console.log('userOrCart: ', userOrCart)
      if (typeof userOrCart === 'number') {
        console.log('trigger')
        const {data} = await axios.get(`/api/cart/view`)
        console.log('returned data: ', data)
        dispatch(setCart(data))
      } else {
        dispatch(setCart(userOrCart))
      }
    } catch (err) {
      throw err
    }
  }
}

export const combineCartThunk = guestCartInfo => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/cart/combinecart', guestCartInfo)
      dispatch(setCart(data))
    } catch (err) {
      throw err
    }
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
