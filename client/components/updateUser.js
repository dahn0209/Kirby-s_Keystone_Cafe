import React from 'react'
// import {fetchUpdateStudent} from '../redux/students'
// import {fetchSingleStudent} from '../redux/singleStudent'

// import {connect} from 'react-redux'

export default class UpdateUser extends React.Component {
  //   constructor(props) {
  //     super(props)
  //     this.state = {
  //       firstName: '',
  //       lastName: '',
  //       email: '',
  //     }
  //     this.handleChange = this.handleChange.bind(this)
  //     this.handleSubmit = this.handleSubmit.bind(this)
  //   }
  //   componentDidMount() {
  //     if (this.props.student.id) {
  //       this.setState({
  //         firstName: this.props.user.firstName,
  //         lastName: this.props.user.lastName,
  //         address: this.props.user.address,
  //         email: this.props.user.email,
  //       })
  //     }
  //   }
  //   componentDidUpdate(prevProps) {
  //     if (!prevProps.student.id && this.props.student.id) {
  //       this.setState({
  //         firstName: this.props.user.firstName,
  //         lastName: this.props.user.lastName,
  //         address: this.props.user.address,
  //         email: this.props.user.email,
  //       })
  //     }
  //   }
  //   handleChange(event) {
  //     this.setState({
  //       [event.target.name]: event.target.value,
  //     })
  //   }
  //   async handleSubmit(event) {
  //     event.preventDefault()
  //     await this.props.fetchUpdateStudent({
  //       ...this.props.student,
  //       ...this.state,
  //     })
  //     await this.props.fetchSingleStudent(this.props.student.id)
  //   }
  //   render() {
  //     return (
  //       <div>
  //         <div>
  //           <form onSubmit={this.handleSubmit}>
  //             <label>
  //               First Name:
  //               <input
  //                 type="text"
  //                 name="firstName"
  //                 value={this.state.firstName}
  //                 onChange={this.handleChange}
  //               />
  //             </label>
  //             <label>
  //               Last Name:
  //               <input
  //                 type="text"
  //                 name="lastName"
  //                 value={this.state.lastName}
  //                 onChange={this.handleChange}
  //               />
  //             </label>
  //             <label>
  //               Email:
  //               <input
  //                 type="text"
  //                 name="email"
  //                 value={this.state.email}
  //                 onChange={this.handleChange}
  //               />
  //             </label>
  //             <input type="submit" value="Submit" />
  //           </form>
  //         </div>
  //       </div>
  //     )
  //   }
  // }
  // const mapState = (state) => {
  //   return {student: state.student}
  // }
  // const mapDispatch = (dispatch) => {
  //   return {
  //     fetchUpdateStudent: (state) => {
  //       return dispatch(fetchUpdateStudent(state))
  //     },
  //     fetchSingleStudent: (id) => {
  //       return dispatch(fetchSingleStudent(id))
  //     },
  //   }
}

// export default connect(mapState, mapDispatch)(UpdateUser)
