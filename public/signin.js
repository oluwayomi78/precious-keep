import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";


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
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();


onAuthStateChanged(auth, (user) => {
    if (user) {
        const userEmail = user.email;
        console.log("User is signed in:", userEmail);
        document.getElementById('profileIcon').innerHTML = `<img src="${user.photoURL}" alt="Profile" class="profile-image" style="width: 40px; height: 40px; border-radius: 50%;">`;
    } else {
        console.log("No user is signed in.");
        document.getElementById('profileIcon').innerHTML = `<i class="fas fa-user-circle profile-icon"></i>`;
    }
});

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


const signIn = () => {
    const email = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    if (email === "" || password === "") {
        alert('Input cannot be empty, fill it up')
    }
    else {
        const userObj = { email, password }
        console.log(userObj);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setInterval(() => {
                    window.location.href = "dashboard.html";
                }, 1000)
            })
            .catch((error) => {
                const errorCode = error.code;

                if (errorCode === "auth/user-not-found") {
                    toast("No user found with this email.");
                } else if (errorCode === "auth/wrong-password") {
                    toast("Incorrect password.");
                } else if (errorCode === "auth/invalid-email") {
                    toast("Invalid email address.");
                } else if (errorCode === "auth/too-many-requests") {
                    toast("Too many failed attempts. Try again later.");
                }
            });
    };
}


const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            setInterval(() => {
                window.location.href = "dashboard.html";
            }, 1000)
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);

            if (errorCode === 'auth/popup-blocked') {
                toast('Popup blocked. Allow popups and try again.');
            } else if (errorCode === 'auth/popup-closed-by-user') {
                toast('Popup closed before completing the sign-in.');
            } else if (errorCode === 'auth/account-exists-with-different-credential') {
                toast('Account exists with a different sign-in method.');
            }
        });
};


const signInWithGithub = () => {
    signInWithPopup(auth, githubProvider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            if (errorCode === 'auth/popup-closed-by-user') {
                toast('Popup closed by user before completing sign-in.');
            } else if (errorCode === 'auth/cancelled-popup-request') {
                toast('Popup request was cancelled.');
            } else {
                toast('An error occurred during sign-in. Please try again.');
            }
        });
}

const signInWithTwitter = () => {
    signInWithPopup(auth,  twitterProvider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            if (errorCode === 'auth/popup-closed-by-user') {
                toast('Popup closed by user before completing sign-in.');
            } else if (errorCode === 'auth/cancelled-popup-request') {
                toast('Popup request was cancelled.');
            } else {
                toast('An error occurred during sign-in. Please try again.');
            }
        });
}


window.signIn = signIn;
window.signInWithGoogle = signInWithGoogle;
window.signInWithGithub = signInWithGithub;
window.signInWithTwitter = signInWithTwitter;