// Firebase
import firebase from 'firebase/compat/app';

// Firebase Services
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Config
const firebaseConfig = {
  apiKey: "AIzaSyCiqVEey5q7lC6bMHc2pTdjZmizXBko5aI",
  authDomain: "priora-3b97b.firebaseapp.com",
  projectId: "priora-3b97b",
  storageBucket: "priora-3b97b.appspot.com",
  messagingSenderId: "1071005989046",
  appId: "1:1071005989046:web:514a58f5b0770a2170ce17"
};

// Firebase Connection Initialization
firebase.initializeApp(firebaseConfig);

// Firebase Services Initialization
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// Timestamp
const timestamp = firebase.firestore.Timestamp;

// Services Export
export {
    projectFirestore,
    projectAuth,
    timestamp
}