// 1. Initialize Phone Input with Flags
const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    preferredCountries: ["in", "us", "ae", "gb"], // India, US, UAE, UK first
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// 2. Email Validation Logic
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

emailInput.addEventListener("blur", () => {
    const emailValue = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailValue)) {
        emailError.style.display = "block";
        emailError.innerText = "Please enter a valid email format.";
    } else {
        emailError.style.display = "none";
        // Optional: Add API call here to check if email is "real"
    }
});

// 3. Form Submission Check
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const isPhoneValid = phoneInput.isValidNumber();
    const phoneError = document.querySelector("#phone-error");

    if (!isPhoneValid) {
        phoneError.style.display = "block";
        return; // Stops the form from sending
    } else {
        phoneError.style.display = "none";
    }

    // If all good, show success
    document.getElementById('thankYouBox').style.display = 'flex';
    this.reset();
});

function closeThankYou() {
    document.getElementById('thankYouBox').style.display = 'none';
}
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents page reload
    
    // Submit the form data to Formspree
    const formData = new FormData(this);
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(() => {
        // Show success box
        document.getElementById('feedbackSuccess').style.display = 'flex';
        this.reset();
    });
});

function closeFeedback() {
    document.getElementById('feedbackSuccess').style.display = 'none';
}
// Function to handle Web3Forms Submissions via AJAX
function handleFormSubmit(formId, successBoxId) {
    const form = document.getElementById(formId);
    const successBox = document.getElementById(successBoxId);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            if (response.status == 200) {
                successBox.style.display = 'flex';
                form.reset();
            } else {
                alert("Something went wrong. Please try again.");
            }
        })
        .catch(error => {
            console.log(error);
        });
    });
}

// Initialize for both forms
handleFormSubmit('contactForm', 'thankYouBox');
handleFormSubmit('feedbackForm', 'feedbackSuccess');

// Close functions
function closeThankYou() { document.getElementById('thankYouBox').style.display = 'none'; }
function closeFeedback() { document.getElementById('feedbackSuccess').style.display = 'none'; }let lastScrollY = window.scrollY;
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // Scrolling Down - Hide Nav
        nav.classList.add('nav-hidden');
    } else {
        // Scrolling Up - Show Nav
        nav.classList.remove('nav-hidden');
    }
    lastScrollY = window.scrollY;
});

// Smooth scroll for the links
document.querySelectorAll('.nav-links a, .nav-btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});// Toggle Modal
function openAuthModal() { document.getElementById('authModal').style.display = 'flex'; }
function closeAuthModal() { document.getElementById('authModal').style.display = 'none'; }

// Switch between Login and Sign In
function switchTab(type) {
    const isLogin = type === 'login';
    document.getElementById('loginSection').style.display = isLogin ? 'block' : 'none';
    document.getElementById('signupSection').style.display = isLogin ? 'none' : 'block';
    document.getElementById('loginTab').classList.toggle('active', isLogin);
    document.getElementById('signupTab').classList.toggle('active', !isLogin);
}

// Simulate Login Error
function handleLogin(e) {
    e.preventDefault();
    document.getElementById('errorMsg').style.display = 'block';
}

// Profile Picture Preview
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('pfp-display');
        output.style.backgroundImage = `url(${reader.result})`;
        output.innerHTML = '';
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Force Auth on Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    const userIsLoggedIn = false; // Simulated check
    if (!userIsLoggedIn) {
        e.preventDefault();
        alert("Please login or sign in to send a message!");
        openAuthModal();
    }
});function openAuthModal() {
    console.log("Attempting to open modal...");
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'flex';
    } else {
        alert("Error: You are missing the <div id='authModal'> in your HTML!");
    }
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}
// Your specific Soclix Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWZ_hd1H-rGja2E7EWqXFndNWtJ8z5zMM",
  authDomain: "soclix-7.firebaseapp.com",
  projectId: "soclix-7",
  storageBucket: "soclix-7.firebasestorage.app",
  messagingSenderId: "707745613226",
  appId: "1:707745613226:web:a55e0d0c13d7b7cdecd7d3",
  measurementId: "G-BFTM5XDGKS"
};

// Initialize Firebase (Compat Version)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// --- SIGN UP LOGIC (Saves to Firebase) ---
function handleSignup(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    const password = event.target.querySelector('input[type="password"]').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Success! Account created for: " + email);
            closeAuthModal();
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

// --- LOGIN LOGIC ---
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('logUser').value;
    const password = document.getElementById('logPass').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("Welcome back!");
            closeAuthModal();
        })
        .catch((error) => {
            // Show the red error text we made
            document.getElementById('errorMsg').style.display = 'block';
        });
}// --- GOOGLE SIGN-IN ---
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            console.log("Google User:", result.user);
            alert("Signed in as " + result.user.displayName);
            closeAuthModal();
        })
        .catch((error) => {
            alert("Google Login Failed: " + error.message);
        });
}

// --- APPLE SIGN-IN ---
function loginWithApple() {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    auth.signInWithPopup(provider)
        .then((result) => {
            alert("Apple Sign-in Successful!");
            closeAuthModal();
        })
        .catch((error) => {
            alert("Apple Login Failed: " + error.message);
        });
}// --- AUTO-UPDATE BUTTON (Login vs Logout) ---
auth.onAuthStateChanged((user) => {
    const authBtn = document.querySelector('.auth-trigger-btn');
    
    if (user) {
        // User is LOGGED IN
        authBtn.innerText = "Logout";
        authBtn.onclick = handleLogout; // Change the click action to Logout
        
        // Optional: Style the logout button differently (e.g., Red-ish)
        authBtn.style.borderColor = "rgba(255, 77, 77, 0.5)";
    } else {
        // User is LOGGED OUT
        authBtn.innerText = "Login / Sign In";
        authBtn.onclick = openAuthModal; // Change click action back to Open Modal
        authBtn.style.borderColor = "rgba(157, 135, 255, 0.3)";
    }
});

// --- LOGOUT FUNCTION ---
function handleLogout() {
    auth.signOut().then(() => {
        alert("Logged out successfully!");
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
}function switchTab(type) {
    const isLogin = type === 'login';
    document.getElementById('loginSection').style.display = isLogin ? 'block' : 'none';
    document.getElementById('signupSection').style.display = isLogin ? 'none' : 'block';
    
    // Update tab highlight
    document.getElementById('loginTab').classList.toggle('active', isLogin);
    document.getElementById('signupTab').classList.toggle('active', !isLogin);
    
    // Hide the error message when switching tabs
    document.getElementById('errorMsg').style.display = 'none';
}