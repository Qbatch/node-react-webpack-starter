import React from "react"
import {connect} from "react-redux"
import { Link } from 'react-router-dom'

import {fetchUsers} from "../actions/userActions"

// @connect((store) => {
//   return {
//     users: store.user.users,
//   };
// })
export default class Layout extends React.Component {
  // componentWillMount() {
   // this.props.dispatch(fetchUsers())
    // console.log (this.props);
  // }



  render() {
      return (
        <div>
          <div>
            <Link to={'/sign_in'}>Sign In</Link>
          </div>
          <div>
            <Link to={'/sign_up'}>Sign Up</Link>
          </div>
        </div>
      )
    // console.log (this.props.users);

    // const {users} = this.props;

    // if (!users.length) {
    //   return <h1>No Users Fetched</h1>
    // }

    // const mappedUsers = users.map((user) => <li key={user.id}>Name: {user.name} <Link to={`/profile/${user.id}`}>Detail</Link></li>)

    // return (
    //   <div>
    //     <h1>
    //       Users:
    //     </h1>
    //     <ul>
    //       {mappedUsers}
    //     </ul>
    //   </div>
    // )
  }
}