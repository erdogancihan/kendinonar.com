//delete user
export const deleteUser = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .delete({ collection: "users", doc: user })
      .then(() => {
        dispatch({ type: "DELETE_USER", user });
      })
      .catch(err => {
        dispatch({ type: "DELETE_USER_ERR", err });
      });
  };
};

//update user
export const editUser = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(user.id)
      .update({
        privilege: user.privilege
      })
      .then(() => {
        dispatch({ type: "EDIT_USER", user });
      })
      .catch(err => {
        dispatch({ type: "EDIT_USER_ERR", err });
      });
  };
};
//update user messageCount
export const editUserMessageCount = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(user.messageSenderUserId)
      .update({
        messageCount: user.userMessageCount
      })
      .then(() => {
        dispatch({ type: "EDIT_USER", user });
      })
      .catch(err => {
        dispatch({ type: "EDIT_USER_ERR", err });
      });
  };
};

//Adds user
export const addUser = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(resp => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            userName: user.userName,
            city: user.city,
            privilege: user.privilege,
            signUpDate: new Date().toDateString(),
            messageCount: user.messageCount
          });
      })
      .then(() => {
        dispatch({ type: "ADD_USER", user });
      })
      .catch(err => {
        dispatch({ type: "ADD_USER_ERR", err });
      });
  };
};
