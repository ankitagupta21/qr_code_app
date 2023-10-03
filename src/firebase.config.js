// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPdIkYseet8MN9Kd7-fcUQDzIYCkp8cG0",
  authDomain: "qr-code-voip-app.firebaseapp.com",
  projectId: "qr-code-voip-app",
  storageBucket: "qr-code-voip-app.appspot.com",
  messagingSenderId: "953780587213",
  appId: "1:953780587213:web:1950a0816d3cd47b707784",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
