import React, { Component } from "react";
import ForumLevel2Content from "./forum-level2-content";
import ForumLevel2Header from "./forum-level2-header";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ForumLevel2 extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;

    firestore.get("topics");

    firestore.setListeners([{ collection: "topics" }]);
    // firestore.onSnapshot({ collection: "topics" });
  }
  render() {
    const { forumTopics } = this.props;
    console.log(this.props);

    const Forumlevel2content =
      forumTopics &&
      forumTopics.map(topic => {
        if (this.props.match.params.id === topic.sub) {
          return <ForumLevel2Content key={topic.id} topic={topic} />;
        }
      });
    // console.log(this.props)
    return (
      <section id="forum-level2" className=" container">
        <ForumLevel2Header topic={this.props.match.params.id} />
        <ul className="forum-header ">
          <li className="hide"/>
          <li>Konu/Konu Yazarı</li>
          <li>Son Mesaj</li>
          <li>Mesajlar</li>
        </ul>
        <div>{Forumlevel2content}</div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    forumTopics: state.firestore.ordered.topics
  };
};
export default connect(mapStateToProps)(ForumLevel2);
