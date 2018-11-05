import React from "react";
import ForumLevel1Content from "./forum-level1-content";
import { Link } from "react-router-dom";

const ForumLevel1 = ({ forumMain, forumSub }) => {
  return (
    <React.Fragment>
      <div className="forum-level1-header border">
        <div className="level-1-title">
          <h5 className="nav-link text-white p-2" key={forumMain.id}>
            {forumMain.main}
          </h5>
        </div>
      </div>
      <div className="container">
        {forumSub &&
          forumSub.map(subTopic => {
            if (forumMain.main === subTopic.main) {
              return (
                <ForumLevel1Content
                  key={subTopic.id}
                  subTopic={subTopic}
                  mainTopic={forumMain.main}
                />
              );
            }
          })}
      </div>
    </React.Fragment>
  );
};

export default ForumLevel1;
