import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CKEditor from "react-ckeditor-component";
import PropTypes from "prop-types";

export class EditMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageContent: "",
      messageDate: "",
      doc: ""
    };
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
  
    this.setState({
      ...this.state,
      messageContent: this.props.messages[this.props.match.params.id]
        .messageContent
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
  };

  onBlur = evt => {
    console.log("onBlur event called with event info: ", evt);
  };

  afterPaste = evt => {
    console.log("afterPaste event called with event info: ", evt);
  };

  editMessage = () => {
    const message = {
      messageContent: this.state.messageContent,
      messageDate: this.state.messageDate
    };
    this.context.store.firestore.update(
      { collection: "messages", doc: this.state.doc },
      message
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(
      {
        ...this.state,
        messageDate: new Date().toISOString(),
        doc: this.props.match.params.id
      },
      () => {
        console.log(this.state);
        this.editMessage();
      }
    );
    this.props.history.goBack();
  };

  render() {
    console.log(this.props.message);
    if (!this.props.auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <section className="container">
        <form onSubmit={this.handleSubmit}>
          <h1>Yorumu Düzenle</h1>
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
  return {
    auth: state.firebase.auth,
    messages: state.firestore.data.messages
  };
};

export default connect(mapStateToProps)(EditMessage);
