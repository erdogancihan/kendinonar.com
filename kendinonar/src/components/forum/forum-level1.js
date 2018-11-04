import React from "react";
import ForumLevel1Content from "./forum-level1-content";
import { Link } from "react-router-dom";

const ForumLevel1 = ({ forumMain, forumSub }) => {
  
  return (
    <React.Fragment>
      <div className="forum-level1-header">
        <div className="level-1-title">
          <Link className="nav-link text-white py-1" to="#">
          <h5 key={forumMain.id}>{forumMain.main}</h5>
          </Link>
        </div>
      </div>
      <div>
        {forumSub &&
          forumSub.map(subTopic => {
            if(forumMain.main===subTopic.main){
              return <ForumLevel1Content key={subTopic.id} subTopic={subTopic} mainTopic= {forumMain.main}/>;
            }        
          })}
      </div>
    </React.Fragment>
  );
};

export default ForumLevel1;
