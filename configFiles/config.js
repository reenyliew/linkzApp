import * as firebase from "firebase";

// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB0gjLcG94BR0qXVoHlwvfIUXXEGFo3oq8",
  authDomain: "linkzapp-d66d4.firebaseapp.com",
  databaseURL: "https://linkzapp-d66d4-default-rtdb.firebaseio.com",
  projectId: "linkzapp-d66d4",
  storageBucket: "linkzapp-d66d4.appspot.com",
  messagingSenderId: "953715168780",
  appId: "1:953715168780:web:70ccbc82c56be117630029",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
