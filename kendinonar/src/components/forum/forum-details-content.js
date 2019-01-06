import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/tr";

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
        <React-Fragment>
          <div className="forum-header">
            <p>{moment(message.messageDate).format("ll")}</p>
            <p>
              <Link to={"/editmessage/" + message.id}>Değiştir</Link>
            </p>
            <p>
              <Link to="" id={message.id} onClick={deleteMessage}>
                Sil
              </Link>
            </p>

            <p>{"#" + orderNumber}</p>
          </div>
        </React-Fragment>
      );
    } else {
      return (
        <React-Fragment>
          <div className="forum-header">
            <p>{moment(message.messageDate).format("ll")}</p>
            <p>{"#" + orderNumber}</p>
          </div>
        </React-Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <MessageActions/>
      <div className="forum-row">
        <div className="forum-content">
          <p>
            <Link to="/user/:id">{message.messageSender}</Link>
            <span className="dark-color"> {messageSender.privilege}</span>
          </p>

          <h3 className="avatar initials">
            {message.messageSender[0] + message.messageSender[1]}
          </h3>

          <div className="user-info">
            <p>
              {"Giriş tarihi: " +
                moment(messageSender.signUpDate).format("DD.MM.YYYY")}
            </p>
            <p>{"Şehir: " + messageSender.city}</p>
            <p>{"Mesajlar: " + messageSender.messageCount}</p>
          </div>
        </div>
        <div
          className="forum-content"
          dangerouslySetInnerHTML={{ __html: message.messageContent }}
        />
      </div>
    </React.Fragment>
  );
};
export default ForumDetailsContent;
