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
            <div className="row no-gutters">
              <div className="col-1" />
              <div className="forum-header1 col-5  p-1">Forum</div>
              <div className="forum-header1 col-3  p-1">Son Mesaj</div>
              <div className="forum-header1 col-3 p-1">Konular</div>
             
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
