// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQP30hAvNVZdcHXBSnWWDNMGcVGOT3gxg",
  authDomain: "sinode-firebase.firebaseapp.com",
  projectId: "sinode-firebase",
  storageBucket: "sinode-firebase.appspot.com",
  messagingSenderId: "726872249083",
  appId: "1:726872249083:web:fe4467f9fca8c81c73d65e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
