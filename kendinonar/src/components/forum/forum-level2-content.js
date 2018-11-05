import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/kendinonar-light.jpg";
import moment from "moment";

const ForumLevel2Content = ({ topic }) => {
  //console.log(message)
  return (
    <div className="container">
      <div className="row forum-level2">
        <div className=" col-1 border p-0">
          <img className="logo" src={Logo} alt="logo" />
        </div>
        <div className=" forum col-4 border p-1  ">
        <Link
            className=" nav-link h6 mb-0 ml-0  p-1"
            to={"/forum/details/" + topic.topicTitle}
          >
            {topic.topicTitle}
          </Link>
          
          <Link className=" p-1"  to="">{topic.topicSender}</Link>
         
        </div>
        <div className="last-message col-4 border">
          <p className="p-0 mb-0">
            Son Gönderi <Link to="">{topic.lastMessageSender}</Link>{" "}
          </p>
          <p className="p-0 mb-0">
            {moment(topic.lastMessageDate.toString()).startOf('day').fromNow()}
          </p>
        </div>
        <div className="topics col-3 border ">
          {topic.messageCount + " mesaj var"}
        </div>
        
      </div>
    </div>
  );
};
export default ForumLevel2Content;
