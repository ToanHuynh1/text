// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { getAnalytics } from 'firebase/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZ3AXSX9ztuMNoDhFn7R91rTuvhBVQhnI",
  authDomain: "chat-app-630e8.firebaseapp.com",
  projectId: "chat-app-630e8",
  storageBucket: "chat-app-630e8.appspot.com",
  messagingSenderId: "389217220133",
  appId: "1:389217220133:web:c1f4ee53e2ab6ecc2af1cc",
  measurementId: "G-179E3Z3629",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();
export { db, auth };
export default firebase;
