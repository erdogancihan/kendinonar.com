import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MainTopic from "./maintopic";
import SubTopics from "./subtopics";
import SubTopic from "./subtopic";

class ForumPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main: "",
      sub: "",
      description: ""
    };
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
    firestore.get("mainTopic");
    firestore.get("subTopic");
    firestore.onSnapshot({ collection: "mainTopic" });
    firestore.onSnapshot({ collection: "subTopic" });
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    });
  };

  //add subtopic
  handleSubSubmit = e => {
    e.preventDefault();

    //this.props.addSubTopic(this.state.forumSub);
    this.setState(
      {
        ...this.state,
        main: e.target.id
      },
      () => {
        this.context.store.firestore.add("subTopic", this.state);
      }
    );
    /*
    this.setState({
      main: "",
      sub: "",
      description: ""
    });
    */
  };

  //add Maintopic
  handleMainSubmit = e => {
    e.preventDefault();
    //get input value without manupulating the state.

    const forumMain = { main: document.getElementById("mainTopicInput").value };

    //this.props.addMainTopic(this.state.forumMain);
    this.context.store.firestore.add("mainTopic", forumMain);

    //this.props.addMainTopic(document.getElementById("mainTopicInput").value);
    //reset the mainTopic textbox
    document.getElementById("mainTopicInput").value = null;
  };

  //delete maintopic
  handleMainDelete = e => {
    e.preventDefault();
    //this.props.deleteMainTopic(e.target.id);
    this.context.store.firestore.delete({
      collection: "mainTopic",
      doc: e.target.id
    });
  };

  //delete subtopic
  handleSubDelete = e => {
    e.preventDefault();
    //this.props.deleteSubTopic(e.target.id);
    this.context.store.firestore.delete({
      collection: "subTopic",
      doc: e.target.id
    });
  };

  //collapse list of main topics

  render() {
    const { forumMain, forumSub } = this.props;

    const mainTopic =
      forumMain &&
      forumMain.map(mainTopic => {
        const subtopic =
          forumSub &&
          forumSub.map(subTopic => {
            if (subTopic.main === mainTopic.main) {
              return (
                <SubTopic
                  key={subTopic.id}
                  subTopic={subTopic}
                  handleSubDelete={this.handleSubDelete}
                />
              );
            } else {
              return null;
            }
          });
        return (
          <div className="admin-container">
            <MainTopic
              key={mainTopic.id}
              mainTopic={mainTopic}
              handleMainDelete={this.handleMainDelete}
              handleChange={this.handleChange}
            />
            <ul>{subtopic}</ul>
            <SubTopics
              main={mainTopic.main}
              handleSubSubmit={this.handleSubSubmit}
              handleChange={this.handleChange}
            />
          </div>
        );
      });

    return (
      <React.Fragment>
        <section id="mainTopic">
          <h1 className="text-center">Ana Konular</h1>
          <div>{mainTopic}</div>
          <form onSubmit={this.handleMainSubmit}>
            <div className="form-group">
              <label htmlFor="mainTopicInput">Yeni Ana Konu</label>
              <input type="text" id="mainTopicInput" />
            </div>
            <button className="btn btn-admin">Ana Konu Ekle</button>
          </form>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
  return {
    forumMain: state.firestore.ordered.mainTopic,
    forumSub: state.firestore.ordered.subTopic
  };
};

export default connect(mapStateToProps)(ForumPanel);
