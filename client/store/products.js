import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS'

/**
 * ACTION CREATORS
 */

export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

/**
 * THUNK CREATORS
 */

export const fetchProducts = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/products')
    dispatch(setProducts(data))
  }
}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers

/**
 * REDUCER
 */

const initialState = []

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
