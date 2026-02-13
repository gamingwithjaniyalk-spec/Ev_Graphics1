// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Toggle icon
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'fixed'; // Changed to fixed for better mobile experience
        navLinks.style.top = '70px';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(18, 18, 18, 0.98)';
        navLinks.style.width = '100%';
        navLinks.style.padding = '20px';
        navLinks.style.textAlign = 'center';
        navLinks.style.height = 'calc(100vh - 70px)'; // Full height minus header
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        navLinks.style.display = 'none';
    }
});

// Smooth Scrolling for Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu on click
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navLinks.style.display = 'none';
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Scroll Animation with Intersection Observer
const observerOptions = {
    threshold: 0.1 // Lower threshold for earlier activation
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Add animation class to elements
document.querySelectorAll('.service-card, .Samples-item, .section-title, .info-item, .why-us-card, .review-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Sample Filtering functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const sampleItems = document.querySelectorAll('.Samples-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Filter samples
        sampleItems.forEach(item => {
            const categories = item.getAttribute('data-category').split(' ');
            const matches = filterValue === 'all' || categories.includes(filterValue);

            if (matches) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Apply initial styles to samples
sampleItems.forEach(item => {
    item.style.transition = 'all 0.3s ease';
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
});

// Reviews Carousel Interaction (Manual Scroll support)
const reviewsCarousel = document.querySelector('.reviews-carousel');
if (reviewsCarousel) {
    // Enable horizontal scrolling with mouse wheel
    reviewsCarousel.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        reviewsCarousel.scrollLeft += evt.deltaY;
    });

    // Add hover effect to individual cards
    const reviewCards = document.querySelectorAll('.reviews-carousel .review-card');
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 243, 255, 0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        });

        // Initial styles
        card.style.transition = 'all 0.3s ease';
        card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    });
}

// Star Rating Functionality
const starIcons = document.querySelectorAll('.star-rating-input i');
const feedbackRatingInput = document.getElementById('feedbackRating');

starIcons.forEach(star => {
    star.addEventListener('click', function () {
        const value = this.getAttribute('data-value');
        feedbackRatingInput.value = value;

        // Update star display
        starIcons.forEach(s => {
            if (parseInt(s.getAttribute('data-value')) <= value) {
                s.classList.remove('far');
                s.classList.add('fas', 'active');
            } else {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            }
        });
    });

    // Hover effect
    star.addEventListener('mouseover', function () {
        const value = this.getAttribute('data-value');
        starIcons.forEach(s => {
            if (parseInt(s.getAttribute('data-value')) <= value) {
                s.classList.remove('far');
                s.classList.add('fas');
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
            }
        });
    });
});

// Reset stars on mouseleave
const starRatingInput = document.querySelector('.star-rating-input');
if (starRatingInput) {
    starRatingInput.addEventListener('mouseleave', function () {
        const currentValue = feedbackRatingInput.value;
        starIcons.forEach(s => {
            if (parseInt(s.getAttribute('data-value')) <= currentValue) {
                s.classList.remove('far');
                s.classList.add('fas', 'active');
            } else {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            }
        });
    });
}

// Feedback Form Submission
const feedbackForm = document.getElementById('feedbackForm');
const successMessage = document.getElementById('successMessage');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Check if rating is selected
        if (feedbackRatingInput.value === '0') {
            alert('Please select a rating!');
            return;
        }

        // Get form values
        const name = document.getElementById('feedbackName').value;
        const email = document.getElementById('feedbackEmail').value;
        const rating = feedbackRatingInput.value;
        const message = document.getElementById('feedbackMessage').value;

        // Change button text to indicate sending
        const submitBtn = feedbackForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS
        // Replace with your Service ID and Template ID
        const templateParams = {
            from_name: name,
            from_email: email,
            rating: rating,
            message: message,
            to_name: "EV Graphic's Admin"
        };

        emailjs.send('service_Janith2007', 'template_jycdexf', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);

                // Add new review to Customer Reviews carousel (visual feedback)
                const reviewsCarousel = document.querySelector('.reviews-carousel');
                if (reviewsCarousel) {
                    // Create new review card HTML
                    let starsHTML = '';
                    for (let i = 0; i < 5; i++) {
                        starsHTML += '<i class="fas fa-star"></i>';
                    }

                    const newReviewHTML = `
                        <div class="review-card" style="animation: slideInUp 0.6s ease-out forwards;">
                            <div class="review-header">
                                <div class="review-stars">
                                    ${starsHTML}
                                </div>
                                <span class="review-rating">${rating}/5</span>
                            </div>
                            <h4>${name}</h4>
                            <p>"${message}"</p>
                        </div>
                    `;

                    // Add card to carousel
                    reviewsCarousel.insertAdjacentHTML('beforeend', newReviewHTML);

                    // Apply hover effects to new card
                    const newCard = reviewsCarousel.lastElementChild;
                    newCard.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    newCard.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';

                    newCard.addEventListener('mouseenter', function () {
                        this.style.transform = 'translateY(-10px) scale(1.02)';
                        this.style.boxShadow = '0 15px 30px rgba(0, 243, 255, 0.4)';
                    });

                    newCard.addEventListener('mouseleave', function () {
                        this.style.transform = 'translateY(0) scale(1)';
                        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
                    });

                    // Scroll to show new review
                    setTimeout(() => {
                        reviewsCarousel.scrollLeft = reviewsCarousel.scrollWidth;
                    }, 100);
                }

                // Hide form and show success message
                feedbackForm.style.display = 'none';
                successMessage.style.display = 'block';

                // Reset form after 5 seconds
                setTimeout(() => {
                    feedbackForm.reset();
                    feedbackForm.style.display = 'block';
                    successMessage.style.display = 'none';
                    feedbackRatingInput.value = '0';
                    submitBtn.innerText = originalBtnText; // Restore button text
                    submitBtn.disabled = false;
                    starIcons.forEach(s => {
                        s.classList.remove('fas', 'active');
                        s.classList.add('far');
                    });
                }, 5000);

            }, function (error) {
                console.log('FAILED...', error);
                alert('Failed to send feedback. Please try again later.');
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// Contact Form Submission (Get In Touch)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        // Change button text to indicate sending
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS - reusing the same template/service for simplicity
        // Ideally you might want a separate template, but this works if the template handles generic messages too
        const templateParams = {
            from_name: name,
            from_email: email,
            rating: "N/A (Contact Form)", // Indicate this is a contact message, not a rating
            message: message,
            to_name: "EV Graphic's Admin"
        };

        emailjs.send('service_Janith2007', 'template_jycdexf', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Message sent successfully! We will get back to you soon.');
                contactForm.reset();
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }, function (error) {
                console.log('FAILED...', error);
                alert('Failed to send message. Please try again later.');
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}
