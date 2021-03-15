// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
//import "firebase/analytics";

// Add the Firebase products that you want to use
//import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyCMPsL4-xyfJgMqBH6zKandDjSnMUicde4",
  authDomain: "mern-9eb4c.firebaseapp.com",
  databaseURL: "https://mern-9eb4c.firebaseio.com",
  projectId: "mern-9eb4c",
  storageBucket: "mern-9eb4c.appspot.com",
  messagingSenderId: "608755264616",
  appId: "1:608755264616:web:2c5b56d511dcb1d2cbdfdd",
  measurementId: "G-WXK36L5QFX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebase.analytics();
//firebase.auth();
//firebase.firestore();

export default firebase;
