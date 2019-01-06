import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SignedInLinks from "../navbar/signedInLinks";
import SignedOutLinks from "../navbar/signedOutLinks";
import Logo from "../../img/kendinonar-logo.jpg";
import { connect } from "react-redux";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navtoggle: false
    };
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
    firestore.get("users");
    firestore.onSnapshot({ collection: "users" });
  }
  handleSignOut = () => {
    console.log("signout");
    this.context.store.firebase.auth().signOut();
  };
  toggleNav = () => {
    //console.log(window.visualViewport.width);
    if(window.visualViewport.width < 768){
      this.setState(
        {
          navtoggle: !this.state.navtoggle
        },
        () => {
          const navlist = document.getElementById("nav-list").childNodes;
          if (this.state.navtoggle) {
            navlist.forEach(element => element.classList.add("show"));
          } else {
            navlist.forEach(element => element.classList.remove("show"));
          }
        }
      );
    }
    
  };

  render() {
    const { auth, user } = this.props;
    return (
      <nav className="container">
        <header>
          <Link to="/" onClick={this.toggleNav}>
            <img className="brand" src={Logo} alt="www.kendinonar" />
          </Link>
          <ul id="nav-list" onClick={this.toggleNav}>
            {auth.uid ? (
              <SignedInLinks user={user} signOut={this.handleSignOut} toggleNav={this.toggleNav} />
            ) : (
              <SignedOutLinks toggleNav={this.toggleNav} />
            )}
          </ul>
        </header>
      </nav>
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
