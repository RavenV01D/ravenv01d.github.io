// firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB7-28T780717eFbhdsUeYQ3W1SByyPsi4",
  authDomain: "raven-void.firebaseapp.com",
  projectId: "raven-void",
  storageBucket: "raven-void.firebasestorage.app",
  messagingSenderId: "780441240689",
  appId: "1:780441240689:web:eb3ba1f59fd578ce5047d0",
  measurementId: "G-MNMHK2KG8S"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Buttons
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userDetails = document.getElementById("user-details");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    userDetails.textContent = `Signed in as ${user.displayName}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    userDetails.textContent = "Not signed in.";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
});
