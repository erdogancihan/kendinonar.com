import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addTopic,
  addMessage,
  editTopicCount,
  editTopic,
  editSubTopic
} from "../../store/actions/forumActions";
import {editUserMessageCount} from "../../store/actions/userActions"
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import CKEditor from "react-ckeditor-component";

export class AddNewTopic extends Component {
  state = {
   
    sub: this.props.match.params.id,
    topicTitle: "",
    messageCount: 1,
    viewCount: 0,
    lastMessageDate: "",
    lastMessageSender: "",
    topicSender: "",
    messageContent: "",
    messageDate: "",
    messageSender: "",
    topicSenderUserId: "",
    topicCount: "",
    doc:'',
    id: "",
    subMessageCount:''
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

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
    this.props.users &&
      this.props.users.map(user => {
        if (user.id === this.props.auth.uid) {
          return (userName = user);
        }
      });

  
    let date = new Date().toLocaleString();
    const mainTopic =
      this.props.forumSub &&
      this.props.forumSub.map(topic => {
        if (this.props.match.params.id === topic.sub) {
          return this.setState(
            {
              ...this.state,
              messageDate: date,
              lastMessageDate: date,
              topicSenderUserId: this.props.auth.uid,
              topicSender: userName.userName,
              messageSenderUserId: this.props.auth.uid,
              messageSender: userName.userName,
              lastMessageSender: userName.userName,
              topicCount: this.props.topics.length + 1,
              doc: this.props.forumSub[0].id,
              id:this.props.forumSub[0].id,
              subMessageCount: this.props.forumSub[0].messageCount+1,
              userMessageCount:userName.messageCount + 1
            },
            () => {
              console.log(this.state)
             
              this.props.addTopic(this.state);
              this.props.addMessage(this.state);
              this.props.editSubTopic(this.state);
              this.props.editTopic(this.state);
              this.props.editTopicCount(this.state);
              this.props.editUserMessageCount(this.state)
              this.props.history.goBack();
            }
          );
        }
      });
  };

  render() {
    if (!this.props.auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Konu Adı</label>
            <input
              type="text"
              className="form-control"
              id="topicTitle"
              aria-describedby="title"
              placeholder="Başlık Giriniz"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Mesaj</label>
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
  //  console.log(state)
  return {
    topics: state.firestore.ordered.topics,
    forumSub: state.firestore.ordered.subTopic,
    auth: state.firebase.auth,
    users: state.firestore.ordered.users
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addTopic: message => dispatch(addTopic(message)),
    addMessage: message => dispatch(addMessage(message)),
    editSubTopic: message => dispatch(editSubTopic(message)),
    editTopic: message => dispatch(editTopic(message)),
    editTopicCount: topicCount => dispatch(editTopicCount(topicCount)),
    editUserMessageCount:user=>dispatch(editUserMessageCount(user))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    { collection: "topics", where: ["sub", "==", props.match.params.id] },
    { collection: "subTopic", where: ["sub", "==", props.match.params.id] },
    { collection: "users" }
  ])
)(AddNewTopic);
