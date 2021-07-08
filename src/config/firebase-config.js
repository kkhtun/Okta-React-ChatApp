import firebase from "firebase";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCUVnojJGPOHwaaInOpqkBEgYJ16U5Qq6Y",
  authDomain: "super-chat-7e077.firebaseapp.com",
  projectId: "super-chat-7e077",
  storageBucket: "super-chat-7e077.appspot.com",
  messagingSenderId: "1086339505560",
  appId: "1:1086339505560:web:a5966b4000856da6965fed",
  measurementId: "G-6156S7WST0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
