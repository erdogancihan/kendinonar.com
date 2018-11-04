import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

const ForumLevel2Content = ({ topic }) => {
  //console.log(message)
  return (
    <div className="container">
      <div className="row forum-level2">
        <div className="logo col-1 border">
          <img src="" alt="logo" />
        </div>
        <div className="forum col-4 border">
          <Link to={"/forum/details/" + topic.topicTitle}>
            {topic.topicTitle}
          </Link>
          <span>
            {" "}
            <Link to="">{topic.topicSender}</Link>
          </span>
        </div>
        <div className="last-message col-3 border">
          <p>
            Gönderen <Link to="">{topic.lastMessageSender}</Link>{" "}
          </p>
          <p>
           { 
             moment( topic.lastMessageDate.toString()).format('LLL')}
           
          </p>
        </div>
        <div className="topics col-2 border ">
          {topic.messageCount + " yorum var"}
        </div>
        <div className="messages col-2 border ">
          {topic.viewCount + " gösterim var"}
        </div>
      </div>
    </div>
  );
};
export default ForumLevel2Content;
