import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "../navbar/signedInLinks";
import SignedOutLinks from "../navbar/signedOutLinks";
import Logo from "../../img/kendinonar-logo.jpg";
import { connect } from "react-redux";

const Navbar = ({ auth }) => {
  return (
    <React.Fragment>
      <div className="navbar-top container">
        <div className="navbar-brand-logo">
          <Link to="/">
            <img src={Logo} alt="www.kendin.onar" />
          </Link>
        </div>
      </div>{" "}
      <div className="container p-0">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="" className="nav-link">
                  Yardım
                </Link>
              </li>
              {auth.uid ? <SignedInLinks /> : <SignedOutLinks />}
            </ul>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Navbar);
