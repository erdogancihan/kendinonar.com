import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SignedInLinks from "../navbar/signedInLinks";
import SignedOutLinks from "../navbar/signedOutLinks";
import Logo from "../../img/kendinonar-logo.jpg";
import { connect } from "react-redux";

class Navbar extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
    firestore.get("users");
    firestore.onSnapshot({ collection: "users" });
    
  }
  handleSignOut = () => {
    console.log("signout")
    this.context.store.firebase.auth().signOut();
  };

  render() {
    const { auth, user } = this.props;
    return (
      <React.Fragment>
        <div className="navbar-top container">
          <div className="navbar-brand-logo">
            <Link to="/">
              <img src={Logo} alt="www.kendin.onar" />
            </Link>
          </div>
        </div>{" "}
        <div className="container p-0  ">
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark d-flex">
            <Link to="" className="navbar-brand">
              Kendin Onar
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav ">
                {auth.uid ? <SignedInLinks user={user} signOut={this.handleSignOut}  /> : <SignedOutLinks />}
              </ul>
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  const userId = state.firebase.auth.uid;
  let user = null;
  if (userId) {
    const users = state.firestore.data.users;
    user = users ? users[userId] : null;
  }
  // console.log(state);
  return {
    auth: state.firebase.auth,
    user: user
  };
};
export default connect(mapStateToProps)(Navbar);
