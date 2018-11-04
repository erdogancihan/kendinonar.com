import React, { Component } from "react";
import { connect } from "react-redux";
import { editMessage } from "../../store/actions/forumActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import CKEditor from "react-ckeditor-component";

export class EditMessage extends Component {
  state = {
    messageContent: "",
    messageDate: "",
    doc: ""
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      messageContent: this.props.message.messageContent
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

  handleSubmit = e => {
    e.preventDefault();

    this.setState(
      {
        ...this.state,
        messageDate: new Date().toLocaleString(),
        doc: this.props.match.params.id
      },
      () => {
        console.log(this.state);
        this.props.editMessage(this.state);
      }
    );
    this.props.history.goBack();
  };

  render() {
    if (this.props.auth.uid !== this.props.message.messageSenderUserId) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="messageContent">Yorumu Düzenle</label>

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

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const messages = state.firestore.data.messages;
  const message = messages ? messages[id] : null;
  return {
    message: message,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editMessage: message => dispatch(editMessage(message))
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
      collection: "messages"
    }
  ])
)(EditMessage);
