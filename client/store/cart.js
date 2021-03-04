import axios from 'axios'

const initialState = []

const SET_CART = 'SET_CART'
const RESET_CART = 'RESET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

export const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

export const addToCart = item => {
  return {
    type: SET_CART,
    item
  }
}

export const addItemToCartThunk = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/addItem/${productId}`)
      dispatch(addToCart(data))
    } catch (err) {
      throw err
    }
  }
}

export const fetchCart = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${userId}`)
      dispatch(setCart(data))
    } catch (err) {
      throw err
    }
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return [action.cart]
    case RESET_CART:
      return initialState
    case ADD_TO_CART:
      return [...state, action.item]
    default:
      return state
  }
}
