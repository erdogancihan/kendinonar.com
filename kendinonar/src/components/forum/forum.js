import React, { Component } from "react";
import ForumLevel1 from "./forum-level1";
import Welcome from "./welcome";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

class Forum extends Component {
  render() {
    const { forumMain, forumSub } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <div className="forum-level1">
            <Welcome />
          </div>
          <div className="forum-header">
            <div className="row">
              <div className="logo col-1" />
              <div className="forum col-4">Forum</div>
              <div className="last-message col-3">Son Mesaj</div>
              <div className="topics col-2 ">Konular</div>
              <div className="messages col-2">Mesajlar</div>
            </div>
          </div>
          {forumMain &&
            forumMain.map(mainTopic => {
              return (
                <ForumLevel1
                  key={mainTopic.id}
                  forumMain={mainTopic}
                  forumSub={forumSub}
                />
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    forumMain: state.firestore.ordered.mainTopic,
    forumSub: state.firestore.ordered.subTopic
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "mainTopic", orderBy: "main" },
    { collection: "subTopic", orderBy: "sub" }
  ])
)(Forum);
