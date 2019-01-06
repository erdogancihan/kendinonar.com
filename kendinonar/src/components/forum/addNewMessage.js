import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CKEditor from "react-ckeditor-component";
import PropTypes from "prop-types";

export class AddNewMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicTitle: this.props.match.params.id,
      messageContent: "",
      messageDate: "",
      messageSenderUserId: "",
      messageSender: "",
      doc: "",
      lastMessageDate: "",
      lastMessageSender: "",
      sub: "",
      subMessageCount: 0,
      userMessageCount: ""
    };
    this.updateContent = this.updateContent.bind(this);
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
    console.log(this.props);
    firestore.get({
      collection: "topics",
      where: ["topicTitle", "==", this.props.match.params.id],
      storeAs: "topicsFiltered"
    });

    firestore.get({
      collection: "messages",
      orderBy: ["messageDate", "desc"],
      where: ["topicTitle", "==", this.props.match.params.id]
    });
    firestore.get({
      collection: "users",
      where: ["userId", "==", this.props.auth.uid]
    });

    firestore.get({
      collection: "subTopic",
      storeAs: "subTopicsFiltered"
    });
  }

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
    console.log(evt.editor.getData());
  };

  onBlur = evt => {
    console.log("onBlur event called with event info: ", evt);
  };

  afterPaste = evt => {
    console.log("afterPaste event called with event info: ", evt);
  };

  addMessage = () => {
    const message = {
      topicTitle: this.state.topicTitle,
      messageContent: this.state.messageContent,
      messageDate: this.state.messageDate,
      messageSenderUserId: this.state.messageSenderUserId,
      messageSender: this.state.messageSender
    };
    this.context.store.firestore.add("messages", message);
  };

  editSubTopic = () => {
    const subTopic = {
      lastMessageDate: this.state.lastMessageDate,
      lastMessageSender: this.state.lastMessageSender,
      lastMessageTitle: this.state.topicTitle,
      messageCount: this.state.subMessageCount
    };
    console.log(subTopic);
    this.context.store.firestore.update(
      { collection: "subTopic", doc: this.state.id },
      subTopic
    );
  };

  editTopic = () => {
    const topic = {
      messageCount: this.state.messageCount,
      lastMessageDate: this.state.lastMessageDate,
      lastMessageSender: this.state.lastMessageSender
    };
    this.context.store.firestore.update(
      { collection: "topics", doc: this.state.doc },
      topic
    );
  };

  editUserMessageCount = () => {
    const messageCount = {
      messageCount: this.state.userMessageCount
    };
    this.context.store.firestore.update(
      { collection: "users", doc: this.state.messageSenderUserId },
      messageCount
    );
  };

  handleSubmit = e => {
    e.preventDefault();

    let subTopicData = {};
    this.props.subTopic &&
      this.props.subTopic.map(subtopic => {
        if (subtopic.sub === this.props.topics[0].sub) {
          return (subTopicData = {
            id: subtopic.id,
            messageCount: subtopic.messageCount
          });
        }
      });

    console.log(subTopicData);
    this.setState(
      {
        ...this.state,
        messageDate: new Date().toISOString(),
        messageSenderUserId: this.props.auth.uid,
        messageSender: this.props.user.userName,
        messageCount: this.props.messages.length + 1,
        doc: this.props.topics[0].id,
        lastMessageDate: new Date().toISOString(),
        lastMessageSender: this.props.user.userName,
        id: subTopicData.id,
        subMessageCount: parseInt(subTopicData.messageCount + 1),
        userMessageCount: parseInt(this.props.user.messageCount + 1)
      },
      () => {
        console.log(this.state);
        this.addMessage();
        this.editTopic();
        this.editSubTopic();
        this.editUserMessageCount();
      }
    );
    this.props.history.goBack();
  };

  render() {
    if (!this.props.auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <section className="container">
        <form onSubmit={this.handleSubmit}>
          <h1>Yeni Yorum</h1>
          <div className="ckeditor">
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
          <button className="btn">Kaydet</button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  const userId = state.firebase.auth.uid;
  let user = null;
  if (userId) {
    const users = state.firestore.data.users;
    user = users ? users[userId] : null;
  }
  return {
    topics: state.firestore.ordered.topicsFiltered,
    subTopic: state.firestore.ordered.subTopicsFiltered,
    auth: state.firebase.auth,
    messages: state.firestore.ordered.messages,
    user: user
  };
};
export default connect(mapStateToProps)(AddNewMessage);
