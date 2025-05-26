import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDFgLpwsFYGaSI6lGqo4cyjcWnj-tnHEac",
    authDomain: "keep-f19e1.firebaseapp.com",
    projectId: "keep-f19e1",
    storageBucket: "keep-f19e1.firebasestorage.app",
    messagingSenderId: "720117879667",
    appId: "1:720117879667:web:d850a0d60b0b0f29e7ab06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const signUp = () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (username === "" || email === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }
    const userObject = {
        username: username,
        email: email,
        password: password
    }
    console.log(userObject);

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            alert("User created successfully");
            setTimeout(() => {
                window.location.href = "signin.html";
            }, 2000);
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);

            if (errorCode === 'auth/password-does-not-meet-requirements') {
                alert('password must contain special character, lowercase, uppercase, number and not less than 8 characters.')
            }
            if (errorCode === 'auth/email-already-in-use') {
                alert('Email already in use.')
            }
            if (errorCode === 'auth/invalid-email') {
                alert('Invalid email address.');
            }
            if (errorCode === 'auth/operation-not-allowed') {
                alert('Email/password accounts are not enabled.');
            }
            if (errorCode === 'auth/missing-password') {
                alert('Password is required.');
            }
            if (errorCode === 'auth/internal-error') {
                alert('An internal error occurred. Please try again.');
            }
        });
}

const signInWithGoogle = () => {
    alert('working')
}


window.signUp = signUp;
window.signInWithGoogle = signInWithGoogle;