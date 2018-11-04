import React from "react";
import { Link } from "react-router-dom";
import AdminLinks from "../navbar/adminLinks";
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions';

const SignedInLinks = (props) => {
  return (
    <React.Fragment>
      <AdminLinks />
      
      <li className="nav-item">
        <Link to="/" onClick={props.signOut} className="nav-link">
          Çıkış yap
        </Link>
      </li>
    </React.Fragment>
  );
};

const mapDispatchToProps=(dispatch)=>{
  return{
    signOut:()=>dispatch(signOut())
  }
}
export default connect(null, mapDispatchToProps) (SignedInLinks);
