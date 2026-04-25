/* ===============================
   PHONE INPUT SETUP
=============================== */
const phoneInput = document.querySelector("#phone");

const iti = window.intlTelInput(phoneInput, {
  initialCountry: "in",
  separateDialCode: true,
  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@25.1.0/build/js/utils.js"
});


/* ===============================
   FORM SUBMIT
=============================== */
async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;

  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  const emailError = document.getElementById("email-error");
  const phoneError = document.getElementById("phone-error");

  const email = emailInput.value.trim();
  const phoneNumber = phoneInput.value.replace(/\D/g, ""); // remove spaces

  let isValid = true;

  // RESET ERRORS
  emailError.style.display = "none";
  phoneError.style.display = "none";

  /* ===============================
     EMAIL VALIDATION (GMAIL ONLY)
  =============================== */
  if (!email.endsWith("@gmail.com")) {
    emailError.innerText = "❌ Enter valid Gmail";
    emailError.style.display = "block";
    isValid = false;
  }

  /* ===============================
     PHONE VALIDATION (INDIA FRIENDLY)
  =============================== */
  if (phoneNumber.length !== 10) {
    phoneError.innerText = "❌ Enter valid 10-digit number";
    phoneError.style.display = "block";
    isValid = false;
  }

  // STOP if invalid
  if (!isValid) return;

  /* ===============================
     SEND DATA (WEB3FORMS)
  =============================== */
  const formData = new FormData(form);

  // append full number with country code
  formData.append("full_phone", iti.getNumber());

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    console.log(result);

    if (result.success) {
      // SHOW THANK YOU POPUP
      document.getElementById("thankYouBox").style.display = "flex";

      // RESET FORM
      form.reset();
    } else {
      alert("❌ Failed: " + result.message);
    }

  } catch (error) {
    console.error(error);
    alert("❌ Network error");
  }
}


/* ===============================
   CLOSE THANK YOU POPUP
=============================== */
function closeThankYou() {
  document.getElementById("thankYouBox").style.display = "none";
}


/* ===============================
   OPTIONAL: DYNAMIC PLACEHOLDER
=============================== */
function updatePlaceholder() {
  const country = iti.getSelectedCountryData().iso2;

  const examples = {
    in: "Mobile Number (e.g. 9876543210)",
    us: "Mobile Number (e.g. 2025550123)",
    gb: "Mobile Number (e.g. 07123456789)"
  };

  phoneInput.placeholder = examples[country] || "Mobile Number";
}

// run on load
updatePlaceholder();

// update when country changes
phoneInput.addEventListener("countrychange", updatePlaceholder);if (form.id === "feedbackForm") {
  document.getElementById("thankTitle").innerText = "Feedback Sent ✅";
  document.getElementById("thankText").innerText = "Your feedback was successfully sent!";
} else {
  document.getElementById("thankTitle").innerText = "Message Sent ✅";
  document.getElementById("thankText").innerText = "We will contact you soon.";
}setTimeout(() => {
  closeThankYou();
}, 3000);let lastScrollY = window.scrollY;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    // scrolling DOWN
    navbar.classList.add("nav-hidden");
  } else {
    // scrolling UP
    navbar.classList.remove("nav-hidden");
  }

  lastScrollY = currentScrollY;
});let lastScrollY = window.scrollY;
const nav = document.querySelector('.capsule-nav');

window.addEventListener('scroll', () => {
    // 1. Detect if we are scrolling up or down
    if (window.scrollY > lastScrollY) {
        // SCROLLING DOWN
        if (window.scrollY > 100) { // Only hide after scrolling 100px
            nav.classList.add('nav-hidden');
        }
    } else {
        // SCROLLING UP
        nav.classList.remove('nav-hidden');
    }

    // 2. Update the position for the next scroll event
    lastScrollY = window.scrollY;
}, { passive: true });