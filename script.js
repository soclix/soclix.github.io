/* --- SOCLIX AUTHENTICATION ENGINE --- */

// 1. MODAL CONTROL
function openAuthModal() {
    const overlay = document.getElementById('authOverlay');
    overlay.style.display = 'flex';
    // Reset to login view whenever opened
    toggleAuth('login');
}

function closeAuthModal() {
    document.getElementById('authOverlay').style.display = 'none';
}

// Close modal if clicking outside the card
window.onclick = function(event) {
    const overlay = document.getElementById('authOverlay');
    if (event.target == overlay) {
        closeAuthModal();
    }
}

// 2. TAB TOGGLING
function toggleAuth(type) {
    const loginSection = document.getElementById('loginSection');
    const signupSection = document.getElementById('signupSection');
    const tabs = document.querySelectorAll('.tab');
    const errorMsg = document.getElementById('authError');

    // Hide error message when switching tabs
    errorMsg.style.display = 'none';

    if (type === 'login') {
        loginSection.style.display = 'block';
        signupSection.style.display = 'none';
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
        tabs[1].classList.add('active');
        tabs[0].classList.remove('active');
    }
}

// 3. LOGIN LOGIC (WITH RED ERROR & REDIRECT)
function handleLogin(event) {
    event.preventDefault();
    const errorMsg = document.getElementById('authError');
    const userField = document.getElementById('loginUser').value;

    // Simulate "User Not Found" logic
    // In a real app, you would fetch() from your database here
    let databaseHasUser = false; 

    if (!databaseHasUser) {
        // Change text to Red and show the message
        errorMsg.style.display = 'block';
        errorMsg.style.color = '#ff4d4d';
        errorMsg.innerHTML = `Username "${userField}" doesn't exist. <b>Sign up to continue</b>`;
        
        // Auto-switch to Signup after a delay so they can read the error
        setTimeout(() => {
            toggleAuth('signup');
            // Pre-fill the signup username for them
            document.getElementById('regUser').value = userField;
        }, 2000);
    } else {
        // Successful login simulation
        processLoginSuccess(userField, "https://via.placeholder.com/150");
    }
}

// 4. SIGNUP & PFP LOGIC
function previewImage(event) {
    const reader = new FileReader();
    const preview = document.getElementById('pfp-display');
    
    reader.onload = function() {
        preview.style.backgroundImage = `url(${reader.result})`;
        preview.innerHTML = ""; // Remove the '+' icon
        preview.style.border = "2px solid #ffabd4";
    }
    
    if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
}

function handleSignup(event) {
    event.preventDefault();
    const user = document.getElementById('regUser').value;
    // Get the preview image data
    const pfp = document.getElementById('pfp-display').style.backgroundImage.slice(5, -2);
    
    // Simulate account creation
    processLoginSuccess(user, pfp || "https://cdn-icons-png.flaticon.com/512/149/149071.png");
}

// 5. GOOGLE & SOCIAL LOGIC
function loginWithGoogle() {
    console.log("Connecting to Google API...");
    
    // Logic: If user is new to Soclix
    const userWantsToContinue = confirm("No Soclix account linked to this Google mail. Create one now?");
    
    if(userWantsToContinue) {
        toggleAuth('signup');
        // Pre-fill "Google" as a placeholder or fetch the real name
        document.getElementById('regUser').placeholder = "Choose a Soclix Username";
    }
}

function loginWithApple() {
    alert("Apple ID integration coming soon!");
}

// 6. SESSION MANAGEMENT (LOGGED IN STATE)
function processLoginSuccess(username, pfpUrl) {
    // 1. Update the Nav Button (White Icon -> User DP)
    const navIcon = document.querySelector('.nav-auth-btn i');
    const navImg = document.getElementById('userPfp');
    
    if(navIcon) navIcon.style.display = 'none';
    navImg.src = pfpUrl;
    navImg.style.display = 'block';
    
    // 2. Change Modal Content to "Profile/Logout" view
    updateModalToProfile(username, pfpUrl);
    
    // 3. Close the modal
    setTimeout(closeAuthModal, 500);
}

function updateModalToProfile(username, pfpUrl) {
    const loginSection = document.getElementById('loginSection');
    const signupSection = document.getElementById('signupSection');
    const authHeader = document.querySelector('.auth-header');
    const divider = document.querySelector('.social-divider');
    const socials = document.querySelector('.social-buttons');

    // Hide everything else
    signupSection.style.display = 'none';
    divider.style.display = 'none';
    socials.style.display = 'none';
    authHeader.innerHTML = `<h2 style="color:white; margin:0;">Account</h2>`;

    // Show Profile Info
    loginSection.innerHTML = `
        <div style="margin-top:20px;">
            <img src="${pfpUrl}" style="width:100px; height:100px; border-radius:50%; border:3px solid #9d87ff; object-fit:cover;">
            <h3 style="color:#ffabd4; margin:15px 0 5px 0;">${username}</h3>
            <p style="color:rgba(255,255,255,0.6); font-size:0.9rem; margin-bottom:25px;">Verified Soclix User</p>
            
            <button onclick="location.reload()" class="submit-btn" style="background:rgba(255,77,77,0.2); border:1px solid #ff4d4d; color:#ff4d4d;">
                Logout
            </button>
        </div>
    `;
}

// 7. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    // Ensure the close button works
    const closeBtn = document.getElementById('closeAuth');
    if(closeBtn) {
        closeBtn.onclick = closeAuthModal;
    }
});