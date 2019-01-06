import React from "react";
import ForumLevel1Content from "./forum-level1-content";

const ForumLevel1 = ({ forumMain, forumSub }) => {
  return (
    <React.Fragment>
      <h3 className="forum-title" key={forumMain.id}>
        {forumMain.main}
      </h3>
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
    </React.Fragment>
  );
};

export default ForumLevel1;
