import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYyHBce5XMItmffcA6E9MhFnHVXnQRjH0",
  authDomain: "barkbnb-ef0be.firebaseapp.com",
  projectId: "barkbnb-ef0be",
  storageBucket: "barkbnb-ef0be.firebasestorage.app",
  messagingSenderId: "870000075445",
  appId: "1:870000075445:web:7f3852e48622bc540d94fc",
  measurementId: "G-CV62XME111",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
