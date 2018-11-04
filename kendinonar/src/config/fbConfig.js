import firebase from 'firebase';
import'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCS6wbpnzKUEz_qhD_8Xa5O1aZ8Yp4c9XE",
    authDomain: "kendinonarcom.firebaseapp.com",
    databaseURL: "https://kendinonarcom.firebaseio.com",
    projectId: "kendinonarcom",
    storageBucket: "kendinonarcom.appspot.com",
    messagingSenderId: "261210472688"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({timestampsInSnapshots:true});

  export default firebase;