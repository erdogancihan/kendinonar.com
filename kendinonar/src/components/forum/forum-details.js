import React from "react";
import ForumDetailsContent from "./forum-details-content";
import ForumDetailsHeader from "./forum-details-header";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const ForumDetails = ({ messages, topic, users }) => {
  // console.log( messages)
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
    users: state.firestore.ordered.users
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    { collection: "topics" },
    { collection: "messages", orderBy: ["messageDate", "desc"], where:['topicTitle', '==', props.match.params.id] },
    { collection: "users" }
  ])
)(ForumDetails);
