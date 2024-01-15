// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8SaXODgzOPAqKuBrNXOaqk-H9kioXiUg",
    authDomain: "emailmodo-2664b.firebaseapp.com",
    projectId: "emailmodo-2664b",
    storageBucket: "emailmodo-2664b.appspot.com",
    messagingSenderId: "790978932990",
    appId: "1:790978932990:web:e2d9142642ee364fdfb5af"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app)
export const auth = getAuth(app)