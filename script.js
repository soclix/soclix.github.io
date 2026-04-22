/* --- SOCLIX ELITE FORM HANDLER --- */

document.addEventListener("DOMContentLoaded", function() {
    // 1. Match this ID exactly to your <form id="..."> in index.html
    const contactForm = document.getElementById('contactForm');
    const thankYouBox = document.getElementById('thankYouBox');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Visual feedback
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    // Show your custom smoky pop-up
                    if (thankYouBox) {
                        thankYouBox.style.display = 'flex';
                    }
                    contactForm.reset();
                } else {
                    alert("Submission Failed: " + result.message);
                }

            } catch (error) {
                console.error("Technical Error:", error);
                // This is the error you were seeing
                alert("Connection issue. If you are on Localhost, try uploading to your domain (InfinityFree) to test properly.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Close Pop-up Logic
function closeThankYou() {
    document.getElementById('thankYouBox').style.display = 'none';
}