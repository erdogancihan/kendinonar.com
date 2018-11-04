import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUser, editUser } from "../../../store/actions/userActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class UserPanel extends Component {
  state = {};
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleEdit = e => {
    e.preventDefault();
    this.setState(
      {
        id: e.target.id,
        privilege: e.target.value
      },
      () => this.props.editUser(this.state)
    );
  };

  handleDelete = e => {
    e.preventDefault();
    this.props.deleteUser(e.target.id);
  };

  render() {
    const { users } = this.props;
    //console.log (this.props)

    const user =
      users &&
      users.map(user => {
        return (
          <tr key={user.id}>
            <td>{user.userName}</td>
            <td>{user.email}</td>
            <td>{user.city}</td>
            <td>{user.messageCount}</td>
            <td>{user.signUpDate}</td>
            <td  style={{width:'30%'}}>
              <select
                
                id={user.id}
                onChange={this.handleEdit}
              >
                <option >{user.privilege}</option>
                <option >{user.privilege === "admin" ? "acemi" : "admin"}</option>
              </select>
            </td>
            <td>
              <span
                className="btn btn-danger"
                id={user.id}
                onClick={this.handleDelete}
              >
                X
              </span>
            </td>
          </tr>
        );
      });

    return (
      <React.Fragment>
        <h5 className="text-center">Kullanıcılar</h5>
        <div className="card">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Message Count</th>
              <th>SignUp Date</th>
              <th >Privilege</th>
              <th/>
            </tr>
          </thead>
          <tbody>{user}</tbody>
        </table>

        </div>
        
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.firestore.ordered.users
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editUser: users => dispatch(editUser(users)),
    deleteUser: users => dispatch(deleteUser(users))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }])
)(UserPanel);
