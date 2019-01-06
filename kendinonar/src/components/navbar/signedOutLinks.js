import React from "react";
import { Link } from "react-router-dom";

const SignedOutLinks = (props) => {
  return (
    <React.Fragment>
      <li onClick={props.toggleNav}>
        <Link to="/signup">Üye Ol</Link>
      </li>
      <li onClick={props.toggleNav}>
        <Link to="/signin">Giriş Yap</Link>
      </li>
    </React.Fragment>
  );
};
export default SignedOutLinks;
