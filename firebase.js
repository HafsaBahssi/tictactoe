// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCztKeCRUwQP55Wg2hkaoRYWm9KjHfUXtY",
  authDomain: "react-login-2660e.firebaseapp.com",
  projectId: "react-login-2660e",
  storageBucket: "react-login-2660e.appspot.com",
  messagingSenderId: "299225214395",
  appId: "1:299225214395:web:3cef53c647f1d45929e89e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth ;
