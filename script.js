// --- 1. MODAL CONTROL ---
function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

// --- 2. TAB SWITCHING ---
function switchTab(type) {
    const isLogin = type === 'login';
    const loginSection = document.getElementById('loginSection');
    const signupSection = document.getElementById('signupSection');
    
    if(loginSection && signupSection) {
        loginSection.style.display = isLogin ? 'block' : 'none';
        signupSection.style.display = isLogin ? 'none' : 'block';
        
        document.getElementById('loginTab').classList.toggle('active', isLogin);
        document.getElementById('signupTab').classList.toggle('active', !isLogin);
        
        // Hide error message when switching
        document.getElementById('errorMsg').style.display = 'none';
    }
}

// --- 3. FIREBASE AUTH LOGIC ---

// --- SIGN UP ---
function handleSignup(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    const password = event.target.querySelector('input[type="password"]').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Account created!");
            closeAuthModal();
        })
        .catch((error) => alert(error.message));
}

// --- LOGIN ---
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('logUser').value;
    const password = document.getElementById('logPass').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            closeAuthModal();
        })
        .catch(() => {
            document.getElementById('errorMsg').style.display = 'block';
        });
}

// --- GOOGLE ---
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(() => closeAuthModal()).catch(err => alert(err.message));
}

// --- LOGOUT ---
function handleLogout() {
    auth.signOut().then(() => {
        window.location.reload(); 
    });
}

// --- 4. THE STATE WATCHER (This handles the button text) ---
auth.onAuthStateChanged((user) => {
    const authBtn = document.querySelector('.auth-trigger-btn');
    if (!authBtn) return;

    if (user) {
        authBtn.innerText = "Logout";
        authBtn.onclick = handleLogout; // Switches button to Logout mode
        authBtn.style.background = "rgba(255, 77, 77, 0.1)"; 
    } else {
        authBtn.innerText = "Login / Sign In";
        authBtn.onclick = openAuthModal; // Switches button to Login mode
        authBtn.style.background = "rgba(255, 255, 255, 0.05)";
    }
});
