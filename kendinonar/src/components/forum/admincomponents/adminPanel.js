import React, { Component } from "react";
import ForumPanel from "./forumPanel";
import UserPanel from "./userPanel";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class AdminPanel extends Component {
  render() {
    const { auth, users } = this.props;

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ForumPanel />
          </div>
          <div className="col-md-6">
            <UserPanel />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }])
)(AdminPanel);
