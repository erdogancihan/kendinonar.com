import React, { Component } from "react";
import ForumDetailsContent from "./forum-details-content";
import ForumDetailsHeader from "./forum-details-header";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { actionTypes } from 'redux-firestore'

class ForumDetails extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { firestore } = this.context.store;
    console.log(this.props);
    firestore.get({
      collection: "topics",
      where: ["topicTitle", "==", this.props.match.params.id],
      storeAs: "topicsFiltered"
    });
    firestore.get({
      collection: "messages",
      orderBy: ["messageDate", "asc"],
      where: ["topicTitle", "==", this.props.match.params.id],
    
    });
    firestore.get({
      collection: "users"
    });

    firestore.get({
      collection: "subTopic",
      storeAs: "subTopicsFiltered"
    });

    this.context.store.firestore.setListener({ collection: "messages", storeAs: "messagesFiltered" });
    firestore.onSnapshot({ collection: "users" });
  }

  componentWillUnmount() {
   this.context.store.firestore.unsetListener({ collection: "messages", storeAs: "messagesFiltered" });
  this.props.dispatch({ type: actionTypes.CLEAR_DATA, preserve: { data: ['users',"subTopic"], ordered:['users',"subTopic"]} })
  }

  deleteMessage = e => {
    e.preventDefault();
    this.context.store.firestore.delete({
      collection: "messages",
      doc: e.target.id
    });
  };

  render() {
    console.log(this.props)
    const { messages, topic, users, auth } = this.props;
    let i = 1;
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
            deleteMessage={this.deleteMessage}
            auth={auth}
            orderNumber={i++}
          />
        );
      });

    return (
      <section id="forum-details" className="container">
        <ForumDetailsHeader topic={topic} auth={auth} />
        {forumDetailsContent}
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const topic = ownProps.match.params.id;
  return {
    topic: topic,
    messages: state.firestore.ordered.messages,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(ForumDetails);
