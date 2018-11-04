import React from "react";
import {Link} from 'react-router-dom';

const AdminLinks = () => {
  return (
    <React.Fragment>
      <li className="nav-item">
        <Link to="/admin" className="nav-link" >
          Admin
        </Link>
      </li>
    </React.Fragment>
  );
};
export default AdminLinks;