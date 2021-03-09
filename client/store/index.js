import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import productsReducer from './products'
import user from './user'
import singleProductReducer from './singleProduct'
import cartReducer from './cart'
import checkoutReducer from './checkout'
import adminProductsReducer from './admin_store/admin_products'
import usersReducer from './users'

export const reducer = combineReducers({
  user,
  users: usersReducer,
  products: productsReducer,
  singleProductReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  adminProducts: adminProductsReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
