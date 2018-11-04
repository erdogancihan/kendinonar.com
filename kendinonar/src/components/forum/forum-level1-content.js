import React from "react";
import { Link } from "react-router-dom";

const ForumLevel1Content = ({ subTopic }) => {
  
    return (
    <div className="container">
      <div className="row forum-level1">
        <div className=" col-1 border ">
          <img className="logo" src="" alt="logo" />
        </div>
        <div className="forum col-4 border ">
          <Link to={"/forum/sub/"+subTopic.sub}>{subTopic.sub}</Link>
          <p>{subTopic.description}</p>
        </div>
        <div className="last-message col-3 border">
          <Link to={"/forum/details/"+subTopic.lastMessageTitle}>{subTopic.lastMessageTitle}</Link>
          <p>
            Gönderen <Link to="">{subTopic.lastMessageSender}</Link>{" "}
          </p>
          <p>
          {subTopic.lastMessageDate}
          </p>
        </div>
        <div className="topics col-2 border">
          {subTopic.topicCount} konu var
        </div>
        <div className="messages col-2 border">
          {subTopic.messageCount} Mesaj var
        </div>
      </div>
    </div>
  );
};
export default ForumLevel1Content;
