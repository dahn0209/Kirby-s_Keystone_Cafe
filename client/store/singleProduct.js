import axios from 'axios'

const initialState = {}

const SET_SINGLE_PRODUCT = 'SEC_SINGLE_PRODUCT'

export const setSingleProduct = product => {
  return {
    type: SET_SINGLE_PRODUCT,
    product
  }
}

export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(setSingleProduct(data))
    } catch (err) {
      throw err
    }
  }
}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
