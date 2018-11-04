import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addMainTopic,
  addSubTopic,
  deleteMainTopic,
  deleteSubTopic
} from "../../../store/actions/forumActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class ForumPanel extends Component {
  state = {
    forumMain: {
      main: ""
    },
    forumSub: {
      main: ""
    }
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      forumSub: {
        ...this.state.forumSub,
        [e.target.id]: e.target.value
      }
    });
    console.log(this.state.forumSub);
  };
  //set state.main accoding to accordion id
  handleCollapse = e => {
    e.preventDefault();
    this.setState({
      forumSub: { main: e.target.id }
    });
  };

  //add subtopic
  handleSubSubmit = e => {
    e.preventDefault();
    console.log(this.state.forumSub);
    this.props.addSubTopic(this.state.forumSub);
    this.setState({
      forumMain:{main:''},
      forumSub: {
        main:'',
        sub: "",
        description: ""
      }
    });
  };

  //add Maintopic
  handleMainSubmit = e => {
    e.preventDefault();
    
    //get input value without manupulating the state.
    this.setState(
      {
        forumMain: { main: document.getElementById("mainTopicInput").value }
      },
      () => {
        this.props.addMainTopic(this.state.forumMain);
      }
    );

    //this.props.addMainTopic(document.getElementById("mainTopicInput").value);
    //reset the mainTopic textbox
    document.getElementById("mainTopicInput").value = null;
  };

  //delete maintopic
  handleMainDelete = e => {
    e.preventDefault();
    this.props.deleteMainTopic(e.target.id);
  };

  //delete subtopic
  handleSubDelete = e => {
    e.preventDefault();
    this.props.deleteSubTopic(e.target.id);
  };

  render() {
    const { forumMain, forumSub } = this.props;

    //collapse list of main topics
    const mainTopic =
      forumMain &&
      forumMain.map(mainTopic => {
        return (
          <div className="card" key={mainTopic.id}>
            <div className="card-header" id="headingOne">
              <h5 className="mb-0">
                <button
                  className="btn btn-link collapsed"
                  key={mainTopic.id}
                  type="button"
                  data-toggle="collapse"
                  data-target={"#collapse" + mainTopic.id}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  id={mainTopic.main}
                  onClick={this.handleCollapse}
                >
                  {mainTopic.main}
                </button>

                <button
                  className="btn btn-link float-right delete"
                  id={mainTopic.id}
                  onClick={this.handleMainDelete}
                >
                  X
                </button>
              </h5>
            </div>

            <div
              id={"collapse" + mainTopic.id}
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#mainTopic"
            >
              <div className="card-body">
                <h5>
                  {mainTopic.main}
                  <span> Alt Konular</span>
                </h5>
                <ul className="list-group">
                  {forumSub &&
                    forumSub.map(SubTopic => {
                      if (mainTopic.main === SubTopic.main) {
                        return (
                          <li className="list-group-item" key={SubTopic.id}>
                            <span> {SubTopic.sub}</span>{" "}
                            <button
                              className="btn btn-link float-right delete"
                              onClick={this.handleSubDelete}
                              id={SubTopic.id}
                            >
                              X
                            </button>
                          </li>
                        );
                      }
                    })}
                </ul>

                <form onSubmit={this.handleSubSubmit} id={mainTopic.main}>
                  <div className="form-group">
                    <label htmlFor="messageContent">Alt Konu Başlığı</label>
                    <input
                      type="text"
                      id="sub"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.forumSub.sub}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="messageContent">Açıklamalar</label>
                    <input
                      type="text"
                      id="description"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.forumSub.description}
                    />
                  </div>
                  <button className="btn btn-secondary ">Alt Konu Ekle</button>
                </form>
              </div>
            </div>
          </div>
        );
      });

    return (
      <React.Fragment>
        <div className="accordion" id="mainTopic">
          <h5 className="text-center">Ana Konular</h5>
          <ul className="list-group">{mainTopic}</ul>
          <form onSubmit={this.handleMainSubmit}>
            <div className="form-group">
              <label htmlFor="messageContent">Yeni Ana Konu</label>
              <input type="text" id="mainTopicInput" className="form-control" />
            </div>
            <button className="btn btn-secondary m-3">Ana Konu Ekle</button>
          </form>
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
const mapDispatchToProps = dispatch => {
  return {
    addMainTopic: mainTopic => dispatch(addMainTopic(mainTopic)),
    addSubTopic: subTopic => dispatch(addSubTopic(subTopic)),
    deleteMainTopic: mainTopic => dispatch(deleteMainTopic(mainTopic)),
    deleteSubTopic: subTopic => dispatch(deleteSubTopic(subTopic))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "mainTopic" }, { collection: "subTopic" }])
)(ForumPanel);
