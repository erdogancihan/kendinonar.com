import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

const ForumDetailsContent = ({
  message,
  messageSender,
  topic,
  deleteMessage,
  auth,
  orderNumber
}) => {
  const handleDelete = e => {
    e.preventDefault();
    deleteMessage(message);
  };

  const MessageActions = () => {
    if (messageSender.id === auth.uid) {
      return (
        <div className="col-4">
          <div className="row">
          <div className="col-6">
            <Link
              to={"/editmessage/" + message.id}
              className={"new-comment p-0"}
             
            >
              Değiştir
            </Link>
          </div>
          <div className="col-6">
            <Link
              to={"/forum/details/" + topic}
              className="new-comment p-0 "
              onClick={handleDelete}
            >
              Sil
            </Link>
          </div>
          </div>
        </div>
      );
    }else{
      return <div className="col-4"/>
    }
  };

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
          <MessageActions/>
          <div className="col-1">{'#'+orderNumber}</div>
        </div>
        <div className="row forum-details">
          <div className="col-3 col-lg-2 border p-1">
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
              <p>{"Giriş tarihi: " + moment(messageSender.signUpDate).format('DD.MM.YYYY')}</p>
              <p>{"Şehir: " + messageSender.city}</p>
              <p>{"Mesajlar: " + messageSender.messageCount}</p>
            </div>
          </div>
          <div
            className="forum col-9 col-lg-10 border p-2  "
            dangerouslySetInnerHTML={{ __html: message.messageContent }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default ForumDetailsContent;
