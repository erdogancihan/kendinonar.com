import React from "react";
import ForumDetailsContent from "./forum-details-content";
import ForumDetailsHeader from "./forum-details-header";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { deleteMessage } from "../../store/actions/forumActions";

const ForumDetails = ({ messages, topic, users, deleteMessage, auth }) => {
  
let i=1;
  const forumDetailsContent =
    messages &&
    messages.map(message => {
      let messageSender = "";
      users &&
        users.map(user => {
          if (user.id === message.messageSenderUserId) {
            return (messageSender = user);
          }
        });
      return (
        <ForumDetailsContent
          key={message.id}
          message={message}
          messageSender={messageSender}
          topic={topic}
          deleteMessage={deleteMessage}
          auth={auth}
          orderNumber={i++}
        />
      );
    });

  return (
    <div className="container">
      <ForumDetailsHeader topic={topic} />
      {forumDetailsContent}
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  const topic = ownProps.match.params.id;
  return {
    topic: topic,
    messages: state.firestore.ordered.messages,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return{
    deleteMessage:message=>dispatch(deleteMessage(message))   
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    { collection: "topics" },
    {
      collection: "messages",
      orderBy: ["messageDate", "desc"],
      where: ["topicTitle", "==", props.match.params.id]
    },
    { collection: "users" }
  ])
)(ForumDetails);
