import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import productsReducer from './products'
import user from './user'
import singleProductReducer from './singleProduct'
import cartReducer from './cart'
import adminProductsReducer from './admin_store/admin_products'

export const reducer = combineReducers({
  user,
  products: productsReducer,
  singleProductReducer,
  cart: cartReducer,
  adminProducts: adminProductsReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
