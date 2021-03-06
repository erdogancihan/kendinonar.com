import React, { Component } from "react";
import ForumPanel from "./forumPanel";
import UserPanel from "./userPanel";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class AdminPanel extends Component {
  constructor(props) {
    super(props);
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
  }

  render() {
    const { auth } = this.props;

    if (!auth.uid) {
      // return <Redirect to="/signin" />;
    }

    return (
      <div className="container admin-container-grid">
        <ForumPanel />
        <UserPanel />
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps)(AdminPanel);
