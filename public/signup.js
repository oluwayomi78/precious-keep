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


const toast = (message, bgColor = "red", color = "white", fontWeight = "bold" , marginTop = "50px", borderRadius = "50px") => {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: bgColor,
            color: color,
            fontWeight: fontWeight,
            marginTop,
            borderRadius,
        },
        onClick: function () {},
    }).showToast();
};

const signUp = () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (username === "" || email === "" || password === "") {
        toast("Please fill in all fields");
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
            toast("User created successfully");
            setInterval(() => {
                window.location.href = "signin.html";
            }, 2000);
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);

            if (errorCode === 'auth/password-does-not-meet-requirements') {
                toast('password must contain special character, lowercase, uppercase, number and not less than 8 characters.')
            }
            if (errorCode === 'auth/email-already-in-use') {
                toast('Email already in use.')
            }
            if (errorCode === 'auth/invalid-email') {
                toast('Invalid email address.');
            }
            if (errorCode === 'auth/operation-not-allowed') {
                toast('Email/password accounts are not enabled.');
            }
            if (errorCode === 'auth/missing-password') {
                toast('Password is required.');
            }
            if (errorCode === 'auth/internal-error') {
                toast('An internal error occurred. Please try again.');
            }
        });
}

const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
        const user = result.user
        console.log(user);
        window.location.href = 'dashboard.html'
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (errorCode === 'auth/popup-closed-by-user') {
            alert('Popup closed by user before completing sign-in.');
        } else if (errorCode === 'auth/cancelled-popup-request') {
            alert('Popup request was cancelled.');
        } else {
            alert('An error occurred during sign-in. Please try again.');
        }
    })
}



window.signUp = signUp;
window.signInWithGoogle = signInWithGoogle;