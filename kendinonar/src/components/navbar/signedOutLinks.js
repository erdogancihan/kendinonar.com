import React from "react";
import { Link } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <React.Fragment>
      <li className="nav-item">
        <Link to="/signup" className="nav-link">
          Üye Ol
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/signin" className="nav-link">
          Giriş Yap
        </Link>
      </li>
    </React.Fragment>
  );
};
export default SignedOutLinks;
