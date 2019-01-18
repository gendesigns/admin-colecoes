import authReducer from './authReducer';
import collectionReducer from './collectionReducer';
import productReducer from './productReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  collection: collectionReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
