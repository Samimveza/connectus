// Contact Popup
const contactButtons = document.querySelectorAll('.contact-btn, .sticky-contact, .cta-button');
const contactPopup = document.getElementById('contactPopup');
const closePopup = document.querySelector('.close-popup');

contactButtons.forEach(button => {
    button.addEventListener('click', () => {
        contactPopup.style.display = 'flex';
    });
});

closePopup.addEventListener('click', () => {
    contactPopup.style.display = 'none';
});

// Close popup when clicking outside
contactPopup.addEventListener('click', (e) => {
    if (e.target === contactPopup) {
        contactPopup.style.display = 'none';
    }
});

// Mobile Navigation
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');

function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    mobileMenuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for mobile menu
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking on navigation links
const navLinkItems = document.querySelectorAll('.nav-links a, .nav-links .contact-btn');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeMobileMenu();
        }
    });
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Team Slider Functionality
const initializeTeamSlider = () => {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.team-member');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!sliderTrack || slides.length === 0) return;
    
    let currentSlide = 0;
    const slidesPerView = slides.length === 1 ? 1 : 2;
    
    if (slides.length === 1) {
        sliderTrack.classList.add('single-item');
        return;
    }
    
    // Create dots
    if (dotsContainer) {
        slides.forEach((_, index) => {
            if (index % slidesPerView === 0) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            }
        });
    }
    
    function updateButtons() {
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide >= slides.length - slidesPerView;
    }
    
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide / slidesPerView);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        const offset = slides[0].offsetWidth + 16;
        sliderTrack.style.transform = `translateX(-${currentSlide * offset}px)`;
        updateButtons();
        updateDots();
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) goToSlide(currentSlide - slidesPerView);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentSlide < slides.length - slidesPerView) goToSlide(currentSlide + slidesPerView);
        });
    }
    
    updateButtons();
};

// Contact Form Handling
const initializeContactForm = () => {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        if (!slug) {
            showNotification('Error: Company ID not found in URL', 'error');
            return;
        }
        
        // Prepare the data for the API
        const requestData = {
            fullname: formData.get('name') || '',
            email: formData.get('email') || '',
            message: formData.get('message') || '',
            phoneNumber: formData.get('phone') || '',
            slug: slug
        };
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send the request to our PHP handler
            const response = await fetch('/api/contact-form-handler.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                showNotification(result.message, 'success');
                contactForm.reset();
                contactPopup.style.display = 'none';
            } else {
                // Show error message
                showNotification(result.error || 'Failed to send message. Please try again.', 'error');
            }
            
        } catch (error) {
            console.error('Contact form error:', error);
            showNotification('Network error. Please check your connection and try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
};

// Notification System
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
};

// Smooth Scrolling for Navigation Links
const initializeSmoothScrolling = () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Lazy Loading for Images
const initializeLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTeamSlider();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeLazyLoading();
    
    // Add loading animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
});

// Handle window resize for responsive slider
window.addEventListener('resize', () => {
    const sliderTrack = document.querySelector('.slider-track');
    if (sliderTrack) {
        // Reset slider position on resize
        sliderTrack.style.transform = 'translateX(0)';
        // Reinitialize slider if needed
        setTimeout(initializeTeamSlider, 100);
    }
}); 