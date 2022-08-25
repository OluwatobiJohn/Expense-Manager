import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBd16MjSNjgPoC9kUSw2VSICiAEZjwi1tM",
  authDomain: "nubiaville-5439d.firebaseapp.com",
  projectId: "nubiaville-5439d",
  storageBucket: "nubiaville-5439d.appspot.com",
  messagingSenderId: "40538881530",
  appId: "1:40538881530:web:d023e5f17aaabaef29f843",
  measurementId: "G-TSTM8TNNX2",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
