import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Developer
// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyCVPdNbsu58nn69ghTrATXcSPxtn2KLa3M",
//   authDomain: "rommanel-colecoes.firebaseapp.com",
//   databaseURL: "https://rommanel-colecoes.firebaseio.com",
//   projectId: "rommanel-colecoes",
//   storageBucket: "rommanel-colecoes.appspot.com",
//   messagingSenderId: "727361524075"
// };

// Production
var config = {
  apiKey: "AIzaSyCtH6lKN9pHsQ3QZmJeDu3VUL3SFAXWPR8",
  authDomain: "rommanel-colecoes-e6383.firebaseapp.com",
  databaseURL: "https://rommanel-colecoes-e6383.firebaseio.com",
  projectId: "rommanel-colecoes-e6383",
  storageBucket: "rommanel-colecoes-e6383.appspot.com",
  messagingSenderId: "470308167778"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
