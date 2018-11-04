//Adds maintopic
export const addMainTopic = mainTopic => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("mainTopic")
      .add({
        ...mainTopic,
        main: mainTopic.main
      })
      .then(() => {
        dispatch({ type: "ADD_MAINTOPIC", mainTopic });
      })
      .catch(err => {
        dispatch({ type: "ADD_MAINTOPIC_ERR", err });
      });
  };
};

//Adds subtopic
export const addSubTopic = subTopic => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("subTopic")
      .add({
        ...subTopic,
        main: subTopic.main,
        sub: subTopic.sub,
        description: subTopic.description,
        topicCount: 0,
        messageCount: 0,
        lastMessageDate: "No messages",
        lastMessageSender: "No messages",
        lastMessageTitle: "No messages"
      })
      .then(() => {
        dispatch({ type: "ADD_SUBTOPIC", subTopic });
      })
      .catch(err => {
        dispatch({ type: "ADD_SUBTOPIC_ERR", err });
      });
  };
};

//edits subtopic
export const editSubTopic = message => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("subTopic")
      .doc(message.id)
      .update({
        lastMessageDate: message.lastMessageDate,
        lastMessageSender: message.lastMessageSender,
        lastMessageTitle: message.topicTitle,
        messageCount:message.subMessageCount
      })
      .then(() => {
        dispatch({ type: "EDIT_SUBTOPIC", message });
      })
      .catch(err => {
        dispatch({ type: "EDIT_SUBTOPIC_ERR", err });
      });
  };
};

//edits topicCount
export const editTopicCount = topicCount => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("subTopic")
      .doc(topicCount.doc)
      .update({
        topicCount: topicCount.topicCount
        // messageCount: message.messageCount,
      })
      .then(() => {
        dispatch({ type: "EDIT_TOPICCOUNT", topicCount });
      })
      .catch(err => {
        dispatch({ type: "EDIT_TOPICCOUNT_ERR", err });
      });
  };
};

//delete maintopic
export const deleteMainTopic = mainTopic => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .delete({ collection: "mainTopic", doc: mainTopic })
      .then(() => {
        dispatch({ type: "DELETE_MAINTOPIC", mainTopic });
      })
      .catch(err => {
        dispatch({ type: "DELETE_MAINTOPIC_ERR", err });
      });
  };
};
//delete subtopic
export const deleteSubTopic = subTopic => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .delete({ collection: "subTopic", doc: subTopic })
      .then(() => {
        dispatch({ type: "DELETE_SUBTOPIC", subTopic });
      })
      .catch(err => {
        dispatch({ type: "DELETE_SUBTOPIC_ERR", err });
      });
  };
};
//Adds topic
export const addTopic = message => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("topics")
      .add({
       
        sub: message.sub,
        topicTitle: message.topicTitle,
        messageCount: 1,
        viewCount: 0,
        lastMessageDate: message.lastMessageDate,
        lastMessageSender: message.lastMessageSender,
        topicSender: message.topicSender,
        topicSenderUserId: message.topicSenderUserId
      })
      .then(() => {
        dispatch({ type: "ADD_TOPIC", message });
      })
      .catch(err => {
        dispatch({ type: "ADD_TOPIC_ERR", err });
      });
  };
};

//edit topic
export const editTopic = message => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("topics")
      .doc(message.doc)
      .update({
        messageCount: message.messageCount,
        lastMessageDate: message.lastMessageDate,
        lastMessageSender: message.lastMessageSender
      })
      .then(() => {
        dispatch({ type: "  EDIT_TOPIC", message });
      })
      .catch(err => {
        dispatch({ type: "  EDIT_TOPIC_ERR", err });
      });
  };
};
//Adds Message
export const addMessage = message => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("messages")
      .add({
        topicTitle: message.topicTitle,
        messageContent: message.messageContent,
        messageDate: message.messageDate,
        messageSenderUserId: message.messageSenderUserId,
        messageSender: message.messageSender
      })
      .then(() => {
        dispatch({ type: "ADD_MESSAGE", message });
      })
      .catch(err => {
        dispatch({ type: "ADD_MESSAGE_ERR", err });
      });
  };
};

//edit Message
export const editMessage = message => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("messages").doc(message.doc)
      .update({
      
        messageContent: message.messageContent,
        messageDate: message.messageDate,
      })
      .then(() => {
        dispatch({ type: "EDIT_MESSAGE", message });
      })
      .catch(err => {
        dispatch({ type: "EDIT_MESSAGE_ERR", err });
      });
  };
};


export const deleteUser = user => {
  return (dispatch, getState) => {
    //make Asyn Call
    dispatch({ type: "DELETE_USER", user });
  };
};
export const editUser = user => {
  return (dispatch, getState) => {
    //make Asyn Call
    dispatch({ type: "EDIT_USER", user });
  };
};
