import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCWP04e-6Ko8Tv0aPHewzcDZ6TQzrnSSOQ",
  authDomain: "se-clubcars.firebaseapp.com",
  projectId: "se-clubcars",
  storageBucket: "se-clubcars.appspot.com",
  messagingSenderId: "903267192037",
  appId: "1:903267192037:web:0e12475e45a1fd1730980c",
  measurementId: "G-FW8K1PNB3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// Facebook Provider
const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  display: "popup",
  auth_type: "reauthenticate"
});
facebookProvider.addScope("email");
facebookProvider.addScope("public_profile");

export { auth, googleProvider, facebookProvider };
