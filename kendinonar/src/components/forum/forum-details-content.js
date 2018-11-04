import React from "react";
import { Link } from "react-router-dom";


const ForumDetailsContent = ({ message, messageSender, topic }) => {
  //console.log(message)
  return (
    <React.Fragment>
      <div className="container">
        <div className="row forum-header">
          <div className="col-5">{message.messageDate}</div>
          <div className="col-2">
            {" "}
            <Link to={"/addmessage/" + topic} className="new-comment p-0">
              Yeni Yorum
            </Link>
          </div>
          <div className="col-2">
            <Link to={"/editmessage/" + message.id} className="new-comment p-0">
              Değiştir
            </Link>
          </div>
          <div className="col-2">
            <Link to={"/addmessage/" + topic} className="new-comment p-0">
              Sil
            </Link>
          </div>
          <div className="col-1">#1</div>
        </div>
        <div className="row forum-details">
          <div className="logo col-3 col-lg-2 border p-1">
            <div>
              <Link to="/user/:id">{message.messageSender}</Link>
              <span className="text-right"> {messageSender.privilege}</span>
            </div>
            <div className="avatar">
              <h3 className="text-uppercase">
                {message.messageSender[0] + message.messageSender[1]}
              </h3>
            </div>
            <div className="user-info">
              <p>{"Giriş tarihi: " + messageSender.signUpDate}</p>
              <p>{"Şehir: " + messageSender.city}</p>
              <p>{"Mesajlar: " + messageSender.messageCount}</p>
            </div>
          </div>
          <div
            className="forum col-9 col-lg-10 border p-2 "
            dangerouslySetInnerHTML={{ __html: message.messageContent }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default ForumDetailsContent;
