import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/kendinonar-light.jpg";
import moment from "moment";

const ForumLevel1Content = ({ subTopic }) => {
  return (
    <div className="forum-row">
      <div className="hide forum-content">
        <img src={Logo} className="avatar" alt="avatar " />
      </div>
      <div className="forum-content">
        <h3>
          <Link to={"/forum/sub/" + subTopic.sub}>{subTopic.sub}</Link>
        </h3>
        <p>{subTopic.description}</p>
      </div>
      <div className="forum-content">
        <p>
          <Link to={"/forum/details/" + subTopic.lastMessageTitle}>
            <strong>{subTopic.lastMessageTitle}</strong>
          </Link>
        </p>
        <p>
          <span className="dark-color"> Son Gönderen</span>{" "}
          <Link to="">{subTopic.lastMessageSender}</Link>{" "}
        </p>
        <p className="mb-0 ">{moment(subTopic.lastMessageDate).fromNow()}</p>
      </div>
      <div className="forum-content">
      <p className="text-center">{subTopic.topicCount} konu var</p>
      </div>
     
    </div>
  );
};
export default ForumLevel1Content;
