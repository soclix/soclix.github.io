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
});
