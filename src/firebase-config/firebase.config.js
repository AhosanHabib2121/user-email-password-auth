// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCi0w1GWWfNnUn0hpOonDv9HlS3N0awYmk",
    authDomain: "user-email-password-auth-192d1.firebaseapp.com",
    projectId: "user-email-password-auth-192d1",
    storageBucket: "user-email-password-auth-192d1.appspot.com",
    messagingSenderId: "235638859917",
    appId: "1:235638859917:web:e2f147533829a19ede1ac4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth
