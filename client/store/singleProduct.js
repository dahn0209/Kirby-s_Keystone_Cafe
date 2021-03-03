import axios from 'axios'

const initialState = {}

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

export const setSingleProduct = product => {
  return {
    type: SET_SINGLE_PRODUCT,
    product
  }
}

export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      console.log('FSP before')
      const {data} = await axios.get(`/api/products/${id}`)
      console.log('FSP after')
      console.log(data)
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
