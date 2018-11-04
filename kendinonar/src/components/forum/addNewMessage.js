import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addMessage,
  editTopic,
  editSubTopic
} from "../../store/actions/forumActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import CKEditor from "react-ckeditor-component";

export class AddNewMessage extends Component {
  state = {
    topicTitle: this.props.match.params.id,
    messageContent: "",
    messageDate: "",
    messageSenderUserId: "",
    messageSender: "",
    doc: "",
    lastMessageDate: "",
    lastMessageSender: "",
    sub: "",
    subMessageCount: 0
  };

  /*
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value      
    });
    console.log(this.state)
  };
*/

  updateContent = newContent => {
    this.setState({
      ...this.state,
      messageContent: newContent
    });
  };

  onChange = evt => {
    console.log("onChange fired with event info: ", evt);
    let newContent = evt.editor.getData();
    this.setState({
      ...this.state,
      messageContent: newContent
    });
  console.log(evt.editor.getData())
  };

  onBlur = evt => {
    console.log("onBlur event called with event info: ", evt);
  };

  afterPaste = evt => {
    console.log("afterPaste event called with event info: ", evt);
  };

  handleSubmit = e => {
    e.preventDefault();

    let userName = null;
    let subTopicData = {
      messageCount: 0
    };
    this.props.subTopic &&
      this.props.subTopic.map(subtopic => {
        if (subtopic.sub === this.props.topics[0].sub) {
          return (subTopicData = {
            id: subtopic.id,
            messageCount: subtopic.messageCount
          });
        }
      });

    this.props.users &&
      this.props.users.map(user => {
        if (user.id === this.props.auth.uid) {
          return (userName = user);
        }
      });

    this.setState(
      {
        ...this.state,
        messageDate: new Date().toLocaleString(),
        messageSenderUserId: this.props.auth.uid,
        messageSender: userName.userName,
        messageCount: this.props.messages.length + 1,
        doc: this.props.topics[0].id,
        lastMessageDate: new Date().toLocaleString(),
        lastMessageSender: userName.userName,
        id: subTopicData.id,
        subMessageCount: subTopicData.messageCount + 1
      },
      () => {
        console.log(this.state);
        this.props.addMessage(this.state);
        this.props.editTopic(this.state);
        this.props.editSubTopic(this.state);
      }
    );
    this.props.history.goBack();
  };

  render() {
    if (!this.props.auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="messageContent">Yeni Yorum</label>

            <CKEditor
              activeClass="p10"
              content={this.state.messageContent}
              events={{
                blur: this.onBlur,
                afterPaste: this.afterPaste,
                change: this.onChange
              }}
            />
          </div>
          <button className="btn btn-secondary m-3">Kaydet</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    topics: state.firestore.ordered.topics,
    subTopic: state.firestore.ordered.subTopic,
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    messages: state.firestore.ordered.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => dispatch(addMessage(message)),
    editTopic: message => dispatch(editTopic(message)),
    editSubTopic: message => dispatch(editSubTopic(message))
  };
};

//
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    {
      collection: "topics",
      where: ["topicTitle", "==", props.match.params.id]
    },

    {
      collection: "messages",
      orderBy: ["messageDate", "desc"],
      where: ["topicTitle", "==", props.match.params.id]
    },
    { collection: "users" },
    {
      collection: "subTopic"
    }
  ])
)(AddNewMessage);
