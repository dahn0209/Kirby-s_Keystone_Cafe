import axios from 'axios'

const initialState = []

const SET_USERS = 'SET_USERS'

// action creator for SET_USERS
export const setUsers = users => {
  return {
    type: SET_USERS,
    users
  }
}

// thunk for SET_USERS
export const adminFetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/admin/users')
      console.log('data ', data)
      dispatch(setUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
export default function adminUsersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}
