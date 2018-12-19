import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
    firestore.get("users");
    firestore.onSnapshot({ collection: "users" });

    /*
    store.firestore.setListeners([
     { collection: 'cities' },
      { collection: 'users' },
    ]),
    */
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleEdit = e => {
    e.preventDefault();
    console.log(e.target.id);
    this.context.store.firestore.update(
      { collection: "users", doc: e.target.id },
      { privilege: e.target.value }
    );
    //this.props.editUser(this.state)
  };

  handleDelete = e => {
    e.preventDefault();
    this.context.store.firestore.delete({
      collection: "users",
      doc: e.target.id
    });
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
            <td>{moment(user.signUpDate).format("MMM Do YY")}</td>
            <td style={{ width: "30%" }}>
              <select
                id={user.id}
                onChange={this.handleEdit}
                value={user.privilege}
              >
                <option>{user.privilege}</option>
                <option>
                  {user.privilege === "admin" ? "acemi" : "admin"}
                </option>
              </select>
            </td>
            <td>
              <span
                className="btn btn-danger btn-sm"
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
        <div className="card ">
          <div className="table-responsive-lg">
            <table className="table table-sm   table-hover">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Message Count</th>
                  <th>SignUp Date</th>
                  <th>Privilege</th>
                  <th />
                </tr>
              </thead>
              <tbody>{user}</tbody>
            </table>
          </div>
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

export default connect(mapStateToProps)(UserPanel);
