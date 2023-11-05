// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCviKahXRHbZuXKJ8bizsmep8Wg0hQnaXU",
  authDomain: "autopathfinders.firebaseapp.com",
  projectId: "autopathfinders",
  storageBucket: "autopathfinders.appspot.com",
  messagingSenderId: "575765170692",
  appId: "1:575765170692:web:878717bfacfca284e0c351"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;