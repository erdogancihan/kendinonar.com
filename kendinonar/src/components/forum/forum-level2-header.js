import React from "react";
import {Link} from 'react-router-dom'


const ForumLevel2Header = ({ topic}) => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Link to={"/addtopic/"+topic} 
            className="new-topic-button btn">
            Yeni Konu Aç
          </Link>
        </div>
        <div className="col-6 offset-sm-4" />
      </div>
      <div className="row forum-level2-header">
        <div className="px-3  h5">
          <span className="text-white">{topic}</span>
        </div>
      </div>
    </div>
  );
};
export default ForumLevel2Header;
