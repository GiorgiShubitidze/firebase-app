import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD-_-g40VYNf3iRygQbKzdntl-AWAcoJdg",
  authDomain: "test-64a6b.firebaseapp.com",
  // databaseURL: "https://test-64a6b.firebaseio.com",
  databaseURL:
    "https://test-64a6b-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "test-64a6b",
  storageBucket: "test-64a6b.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};

export default firebase.initializeApp(firebaseConfig);
