// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyARvBXSPj-c74oOq-SBXVnbJH0gxBJePnI",
  authDomain: "pearl-ashore.firebaseapp.com",
  projectId: "pearl-ashore",
  storageBucket: "pearl-ashore.appspot.com",
  messagingSenderId: "1061993746229",
  appId: "1:1061993746229:web:689eca12ed809aea20067c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;