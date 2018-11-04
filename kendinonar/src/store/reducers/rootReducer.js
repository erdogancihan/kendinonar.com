import authReducer from './authReducer';
import forumReducer from './forumReducer';
import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth:authReducer,
    forums:forumReducer,
    firestore:firestoreReducer,
    firebase:firebaseReducer
});

export default rootReducer;