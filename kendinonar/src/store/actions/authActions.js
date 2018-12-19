export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        return dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        return dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};
export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        return dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};
