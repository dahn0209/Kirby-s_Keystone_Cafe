import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

//action creator for SET_PRODUCTS
export const adminSetProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

// thunk for SET_PRODUCTS
export const adminFetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/admin/products')
      dispatch(adminSetProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// action creator for CREATE_PRODUCT
export const createProduct = product => {
  return {
    type: CREATE_PRODUCT,
    product
  }
}

// thunk for CREATE_PRODUCT
export const createNewProduct = product => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/admin/products', product)
      const newProduct = response.data
      dispatch(createProduct(newProduct))
    } catch (error) {
      console.log(error)
    }
  }
}

//action creator for DELETE_PRODUCT
export const deleteProduct = product => {
  return {
    type: DELETE_PRODUCT,
    product
  }
}

// thunk for DELETE_PRODUCT
export const deleteProductThunk = product => {
  return async dispatch => {
    try {
      await axios.delete(`/api/admin/products/${product.id}`)
      dispatch(deleteProduct(product))
    } catch (error) {
      console.log(error)
    }
  }
}

//action creator for UPDATE_PRODUCT
export const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

//thunk for UPDATE_PRODUCT
export const updateProductThunk = product => {
  return async dispatch => {
    try {
      const response = await axios.put(
        `/api/admin/products/${product.id}`,
        product
      )
      const updatedProduct = response.data
      dispatch(updateProduct(updatedProduct))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

//reducer
export default function adminProductsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.product.id)
    case UPDATE_PRODUCT:
      return state.map(product => {
        return product.id === action.product.id ? action.product : product
      })
    default:
      return state
  }
}
