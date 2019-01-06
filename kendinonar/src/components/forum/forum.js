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
      <section id="forum-level1" className="container">
        <Welcome />
        <ul className="forum-header">
          <li>Forum</li>
          <li>Son Mesaj</li>
          <li>Konular</li>
        </ul> 
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
      </section>
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
