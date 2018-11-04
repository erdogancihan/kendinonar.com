const initState = {
  authError: null
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_USER":
      console.log("User added ", action.user);
      return state;
    case "ADD_USER_ERR":
      console.log("add user error", action.user);
    case "EDIT_USER":
      console.log("user Edited", action.user);
      return state;
    case "EDIT_USER_ERR":
      console.log("edit user error", action.user);
    case "DELETE_USER":
      console.log("user deleted", action.user);
      return state;
    case "DELETE_USER_ERR":
      console.log("delete user error", action.user);
    case "LOGIN_SUCCESS":
      console.log("LOGIN_SUCCESS");
      return {
        ...state,
        authError: null
      };
    case "LOGIN_ERROR":
      console.log("Login error", action.credentials);
      return {
        ...state,
        authError: "Login failed"
      };
    case "SIGNOUT_SUCCESS":
      console.log("SIGNOUT_SUCCESS");
      return state;

    default:
      return state;
  }
};

export default authReducer;
