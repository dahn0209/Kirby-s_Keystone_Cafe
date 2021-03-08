import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <header>
    <h1 className="heading">Kirbys Kafe</h1>
    <nav>
      {isLoggedIn ? (
        <div className="nav-item-login">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/updateUser">Update Profile</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart/1">Cart</Link>
        </div>
      ) : (
        <div className="nav-item">
          {/* The navbar will show these links before you log in */}

          <Link to="/">Home</Link>

          <Link to="/login">Login</Link>

          <Link to="/signup">Sign Up</Link>

          {/* update to user parameter after finished testing*/}
          <Link to="/cart/view">Cart</Link>
        </div>
      )}
    </nav>
    <hr />
  </header>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      window.localStorage.removeItem('cart')
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
