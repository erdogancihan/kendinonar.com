import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/kendinonar-light.jpg";
import moment from "moment";

const ForumLevel2Content = ({ topic }) => {
  //console.log(message)
  return (
    <div className="forum-row  ">
      <div className="forum-content hide">
        <img className="avatar" src={Logo} alt="logo" />
      </div>
      <div className="forum-content">
        <h3>
          <Link to={"/forum/details/" + topic.topicTitle}>
            {topic.topicTitle}
          </Link>
        </h3>
        <p>
          <Link className="dark-color" to="">
            {topic.topicSender}
          </Link>
        </p>
      </div>
      <div className="forum-content">
        <p>
          Son Gönderi{" "}
          <Link className="dark-color" to="">
            {topic.lastMessageSender}
          </Link>{" "}
        </p>
        <p>{moment(topic.lastMessageDate.toString()).fromNow()}</p>
      </div>
      <div className="forum-content text-center">
        <p>{topic.messageCount + " mesaj var"}</p>
      </div>
    </div>
  );
};
export default ForumLevel2Content;
