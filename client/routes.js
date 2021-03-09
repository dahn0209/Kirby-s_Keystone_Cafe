import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, SingleProduct} from './components'
import {me} from './store'
import AllProducts from './components/AllProducts'
import Cart from './components/Cart'

import Checkout from './components/Checkout'
import Confirmation from './components/Confirmation'
import AdminAllProducts from './components/AdminAllProducts'
import EditProduct from './components/EditProductForm'
import AdminAllUsers from './components/AdminAllUsers'
import updateUser from './components/updateUser'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />

              {isAdmin && (
                // routes placed here are only for Admins
                <Switch>
                  <Route
                    exact
                    path="/admin/products"
                    component={AdminAllProducts}
                  />
                  <Route exact path="/admin/users" component={AdminAllUsers} />

                  <Route
                    exact
                    path="/admin/products/:productId/edit"
                    component={EditProduct}
                  />
                  <Route exact path="/updateUser" component={updateUser} />
                </Switch>
              )}

              <Route exact path="/updateUser" component={updateUser} />
            </Switch>
          )}

          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
        <Route exact path="/" component={AllProducts} />
        <Route exact path="/products/:productId" component={SingleProduct} />

        <Route exact path="/cart/view" component={Cart} />

        <Route exact path="/checkout" component={Checkout} />

        <Route exact path="/confirmation" component={Confirmation} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
