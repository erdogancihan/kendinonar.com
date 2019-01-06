import React from "react";
import { Link } from "react-router-dom";
import AdminLinks from "../navbar/adminLinks";

const SignedInLinks = props => {
  return (
    <React.Fragment>
      {props.user && props.user.privilege === "admin" ? <AdminLinks /> : null}
      <li onClick={props.toggleNav}>
        <a>
          Hoşgeldin{" "}
          <span className="avatarTop">
            {props.user && props.user ? props.user.userName : null}{" "}
          </span>
        </a>
      </li>
      <li  onClick={props.toggleNav}>
        <Link to="/" onClick={props.signOut}>
          Çıkış yap
        </Link>
      </li>
    </React.Fragment>
  );
};

export default SignedInLinks;
