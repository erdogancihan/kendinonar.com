import React, { Component } from "react";
import ForumLevel2Content from "./forum-level2-content";
import ForumLevel2Header from "./forum-level2-header";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class ForumLevel2 extends Component {
  render() {
    const { forumTopics, users } = this.props;

    
    const Forumlevel2content=forumTopics &&
      forumTopics.map(topic => {
        if (this.props.match.params.id === topic.sub) {
            return (
            <ForumLevel2Content key={topic.id} topic={topic}  />
          );
        }
      })
  // console.log(this.props)
    return (
      <div className=" container">
        <ForumLevel2Header topic={this.props.match.params.id}/>
        <div className="forum-header ">
          <div className="row">
            <div className="logo col-1 " />
            <div className="forum col-4 ">Konu/Konu Yazarı</div>
            <div className="last-message col-3 ">Son Mesaj</div>
            <div className="topics col-2 ">Mesajlar</div>
            <div className="messages col-2 ">Gösterim</div>
          </div>
        </div>
        <div className="forum-level2 ">
         {Forumlevel2content}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {  
  return {    
    forumTopics: state.firestore.ordered.topics, 
    users:state.firestore.ordered.users   
  };
};

export default compose(
  connect(
    mapStateToProps
   
  ),
  firestoreConnect([{ collection: "mainTopic" }, { collection: "subTopic" },{collection:'topics' , orderBy:['lastMessageDate','desc']}, {collection:'users'}])
)(ForumLevel2);

