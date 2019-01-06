import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CKEditor from "react-ckeditor-component";
import PropTypes from "prop-types";

export class AddNewTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      doc: "",
      id: "",
      subMessageCount: ""
    };
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
    firestore.get({
      collection: "topics",
      where: ["sub", "==", this.props.match.params.id],
      storeAs: "topicsFiltered"
    });
    firestore.get({
      collection: "subTopic",
      where: ["sub", "==", this.props.match.params.id],
      storeAs: "subTopicsFiltered"
    });
  }

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
    console.log(evt.editor.getData());
  };

  onBlur = evt => {
    console.log("onBlur event called with event info: ", evt);
  };

  afterPaste = evt => {
    console.log("afterPaste event called with event info: ", evt);
  };

  addTopic = () => {
    const topic = {
      sub: this.state.sub,
      topicTitle: this.state.topicTitle,
      messageCount: 1,
      viewCount: 0,
      lastMessageDate: this.state.lastMessageDate,
      lastMessageSender: this.state.lastMessageSender,
      topicSender: this.state.topicSender,
      topicSenderUserId: this.state.topicSenderUserId
    };
    this.context.store.firestore.add("topics", topic);
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
      messageCount: this.state.subMessageCount,
      topicCount: this.state.topicCount
    };
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
    const { user } = this.props;
    let date = new Date().toISOString();
    const mainTopic =
      this.props.subTopicsFiltered &&
      this.props.subTopicsFiltered.map(topic => {
        if (this.props.match.params.id === topic.sub) {
          return this.setState(
            {
              ...this.state,
              messageDate: date,
              lastMessageDate: date,
              topicSenderUserId: this.props.auth.uid,
              topicSender: user.userName,
              messageSenderUserId: this.props.auth.uid,
              messageSender: user.userName,
              lastMessageSender: user.userName,
              topicCount: this.props.topicsFiltered.length + 1,
              doc: this.props.subTopicsFiltered[0].id,
              id: this.props.subTopicsFiltered[0].id,
              subMessageCount: this.props.subTopicsFiltered[0].messageCount + 1,
              userMessageCount: user.messageCount + 1
            },
            () => {
              console.log(this.state);
              this.addTopic();
              this.addMessage();
              this.editSubTopic();
              this.editTopic();
              this.editUserMessageCount();
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
      <section className="container">
      <h1>YENİ KONU AÇIN</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="topicTitle">Konu Adı</label>
            <input
              type="text"
              id="topicTitle"
              aria-describedby="title"
              placeholder="Konu Adı Giriniz"
              onChange={this.handleChange}
            />
          </div>

          <h1>Mesaj</h1>
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
         

          <button className="btn ">Kaydet</button>
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
    topicsFiltered: state.firestore.ordered.topicsFiltered,
    subTopicsFiltered: state.firestore.ordered.subTopicsFiltered,
    auth: state.firebase.auth,
    user: user
  };
};
export default connect(mapStateToProps)(AddNewTopic);
