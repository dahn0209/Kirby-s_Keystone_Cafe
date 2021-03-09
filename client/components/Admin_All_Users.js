import React from 'react'
import {adminFetchUsers} from '../store/admin_store/admin_users'
import {connect} from 'react-redux'

export class Admin_All_Users extends React.Component {
  componentDidMount() {
    this.props.adminFetchUsers()
  }
  render() {
    console.log('props: ', this.props)
    const users = this.props.adminUsers
    return (
      <div>
        <h1>All Users listed below</h1>
        {/* {users.map((user) => {
          return (
            <div key={user.id}>
              <h2>{user.firstName}</h2>
            </div>
          )
        })} */}
      </div>
    )
  }
}

const mapState = state => {
  console.log('STATE: ', state)
  return {
    adminUsers: state.adminUsers
  }
}

const mapDispatch = dispatch => {
  return {
    adminFetchUsers: () => dispatch(adminFetchUsers())
  }
}

export default connect(mapState, mapDispatch)(Admin_All_Users)
