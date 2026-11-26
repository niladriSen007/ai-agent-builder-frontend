import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuu_OAeoK6PqPbWHed6H1Fd78dqRM5rw0",
  authDomain: "ai-agent-builder-4bf82.firebaseapp.com",
  projectId: "ai-agent-builder-4bf82",
  storageBucket: "ai-agent-builder-4bf82.firebasestorage.app",
  messagingSenderId: "78847755489",
  appId: "1:78847755489:web:88a7a7f582d10127a063a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebase_auth = getAuth(app)
export const google_provider = new GoogleAuthProvider()