import * as firebase from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyC_Tt3kQWzUDy0qH_--JKaWbZvq4ZpEJDA",
  authDomain: "reunionapp-62e5a.firebaseapp.com",
  databaseURL: "https://reunionapp-62e5a.firebaseio.com",
  projectId: "reunionapp-62e5a",
  storageBucket: "reunionapp-62e5a.appspot.com",
  messagingSenderId: "366567763999",
  appId: "1:366567763999:web:562ed02b5df702e8fca52a",
  measurementId: "G-3Q2D30M7C8"

};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase