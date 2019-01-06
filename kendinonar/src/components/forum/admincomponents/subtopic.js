import React from "react";

function SubTopic({ subTopic, handleSubDelete }) {

  if (subTopic) {
    return (
      <li className="forum-admin">
        <p>{subTopic.main+" / " +subTopic.sub}</p>

        <button className="btn btn-admin" onClick={handleSubDelete} id={subTopic.id}>
          X
        </button>
      </li>
    );
  } else {
    return null;
  }
}

export default SubTopic;
