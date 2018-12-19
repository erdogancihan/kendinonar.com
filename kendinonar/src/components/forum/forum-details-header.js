import React from "react";
import {Link} from 'react-router-dom'

const ForumDetailsHeader = ({topic}) => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Link to={"/addmessage/"+topic}  className="new-comment btn">Yeni Yorum Yap</Link>
        </div>
        <div className="col-6 offset-sm-4" />
      </div>

      <div className="row forum-details-header">
        <div className="level-2-title">
          <h5 className=" px-4 text-white">{topic}</h5>
        </div>
      </div>
     
    </div>
  );
};
export default ForumDetailsHeader;
