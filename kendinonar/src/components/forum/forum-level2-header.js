import React from "react";
import { Link } from "react-router-dom";

const ForumLevel2Header = ({ topic }) => {
  return (
    <React-Fragment>
      <Link to={"/addtopic/" + topic} className="btn">
        Yeni Konu Aç
      </Link>

      <h3 className="forum-title">{topic}</h3>
    </React-Fragment>
  );
};
export default ForumLevel2Header;
