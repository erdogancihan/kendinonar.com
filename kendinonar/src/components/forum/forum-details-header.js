import React from "react";
import { Link } from "react-router-dom";

const ForumDetailsHeader = ({ topic, auth }) => {
  return (
    <React-Fragment>
      {auth.uid ? (
        <Link to={"/addmessage/" + topic} className="btn">
          Yeni Yorum Yap
        </Link>
      ) : (
        <Link to={"/signin"} className="btn">
          Yeni Yorum Yap
        </Link>
      )}
      <h3 className="forum-title">{topic}</h3>
    </React-Fragment>
  );
};
export default ForumDetailsHeader;
