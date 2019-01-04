import { createStore, combineReducers, compose } from "redux";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

// Initialize Firebase
var fbConfig = {
  apiKey: "AIzaSyBaSNaSzhKs1pgWruDcPVlZfFYkeDa9J1U",
  authDomain: "kendinonarcom-98a9f.firebaseapp.com",
  databaseURL: "https://kendinonarcom-98a9f.firebaseio.com",
  projectId: "kendinonarcom-98a9f",
  storageBucket: "",
  messagingSenderId: "811143485732"
};

//firebase.firestore().settings({ timestampsInSnapshots: true });



const rrfConfig = {
  userProfile: "users"
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);
// Initialize Cloud Firestore through Firebase
firebase.firestore().settings({ timestampsInSnapshots: true });

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument, rfConfig as optional second
  reduxFirestore(firebase)
)(createStore);

// Add Firebase to reducers
const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);
export default store;
