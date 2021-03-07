import axios from 'axios'

const initialState = []

const SET_CART = 'SET_CART'
const GUEST_CART = 'GUEST_CART'
const ADD_TO_CART = 'ADD_TO_CART'

export const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

export const guestCart = cart => {
  return {
    type: GUEST_CART,
    cart: cart
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
      console.log('add', data)
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
      console.log('remove', data)
      dispatch(setCart(data))
    } catch (err) {
      throw err
    }
  }
}

export const fetchCart = userOrCart => {
  return async dispatch => {
    try {
      console.log('fetchCatch async')
      if (typeof userOrCart === 'number') {
        console.log('fetchCart number received')
        const {data} = await axios.get(`/api/cart/view`)
        console.log('fetchedCart:', data)
        dispatch(setCart(data))
      } else {
        console.log('fetchCart cartInfo received')
        dispatch(guestCart(userOrCart))
      }
    } catch (err) {
      throw err
    }
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case GUEST_CART:
      return action.cart
    case ADD_TO_CART:
      return [...state, action.item]
    default:
      return state
  }
}
