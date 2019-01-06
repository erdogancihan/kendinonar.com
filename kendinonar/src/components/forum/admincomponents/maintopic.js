import React from "react";



function Maintopic({ mainTopic,handleMainDelete}) {
  return (
    <div className="forum-admin">
      <h3 >{mainTopic.main}</h3>
      <button
        className="btn btn-admin"
        id={mainTopic.id}
        onClick={handleMainDelete}
      >
        X
      </button>

      
    </div>
  );
}

export default Maintopic;
