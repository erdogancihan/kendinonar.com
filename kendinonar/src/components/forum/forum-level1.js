import React from "react";
import ForumLevel1Content from "./forum-level1-content";

const ForumLevel1 = ({ forumMain, forumSub }) => {
  return (
    <React.Fragment>
      <div className="forum-level1-header border">
        <div className="level-1-title">
          <h6 className="nav-link " key={forumMain.id}>
            {forumMain.main}
          </h6>
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
          }
          )}
      </div>
    </React.Fragment>
  );
};

export default ForumLevel1;
