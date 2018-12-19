import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/kendinonar-light.jpg";
import moment from 'moment'



const ForumLevel1Content = ({ subTopic }) => {
  return (
    <div className="row forum-level1">
      <div className=" col-1 border p-0">
        <img className="logo" src={Logo} alt="logo" />
      </div>
      <div className="forum col-5 border p-0 ">
        <Link className=" nav-link h6 mb-0 ml-0 p-1 " to={"/forum/sub/" + subTopic.sub}>{subTopic.sub}</Link>
        <p className="p-1">{subTopic.description}</p>
      </div>
      <div className="last-message col-3 p-1 border">
        <Link className=" nav-link mb-0 text-dark text-left p-0 " to={"/forum/details/" + subTopic.lastMessageTitle}>
        <strong>{subTopic.lastMessageTitle}</strong>  
        </Link>
        <p className="mb-0 ">
          Son Gönderen <Link to="">{subTopic.lastMessageSender}</Link>{" "}
        </p>
        <p className="mb-0 ">{ moment(subTopic.lastMessageDate).fromNow()}</p>
      </div>
      <div className="topics col-3 p-1 border">{subTopic.topicCount} konu var</div>
    
    </div>
  );
};
export default ForumLevel1Content;
