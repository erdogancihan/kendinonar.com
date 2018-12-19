import React from "react";
import { Link } from "react-router-dom";
import AdminLinks from "../navbar/adminLinks";


const SignedInLinks = (props) => {

   return (
    <React.Fragment>
    {props.user && props.user.privilege ==='admin' ? <AdminLinks /> : null}      
    <li className="nav-item ">
        <a className="nav-link">
        Hoşgeldin <span className="avatarTop">{ props.user && props.user? props.user.userName :null}  </span>         
        </a>
      </li>
      <li className="nav-item">
        <Link to="/" onClick={props.signOut} className="nav-link">
        Çıkış yap
        </Link>
      </li>
    </React.Fragment>
  );
};


export default SignedInLinks;
