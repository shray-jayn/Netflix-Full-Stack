import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBIfIPscdOCGXm6t0hOsKsA1c72D7J5Zt0",
  authDomain: "netlix-mern.firebaseapp.com",
  projectId: "netlix-mern",
  storageBucket: "netlix-mern.appspot.com",
  messagingSenderId: "779994311329",
  appId: "1:779994311329:web:61e5d96918c6d53a785ee0",
  measurementId: "G-B43F8D93DL",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
