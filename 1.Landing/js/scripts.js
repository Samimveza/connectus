// Custom Notification System
class NotificationSystem {
    constructor() {
        this.createNotificationContainer();
    }

    createNotificationContainer() {
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Create icon based on type
        let icon = '';
        switch(type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'loading':
                icon = '<i class="fas fa-spinner fa-spin"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        notification.innerHTML = `
            <div class="notification-content">
                ${icon}
                <span>${message}</span>
            </div>
        `;
        
        this.container.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove notification after duration
        if (duration > 0) {
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }
        
        return notification;
    }

    remove(notification) {
        if (notification) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const notificationSystem = new NotificationSystem();
    
    // Newsletter Subscription
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('subscriptionEmail').value;
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            const loadingNotification = notificationSystem.show('Processing your subscription...', 'loading', 0);
            
            try {
                const response = await fetch(CONFIG.API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Domain': CONFIG.DOMAIN
                    },
                    body: JSON.stringify({
                        email: email,
                        source: 'Website'
                    })
                });
                
                const data = await response.json();
                
                // Remove loading notification
                notificationSystem.remove(loadingNotification);
                
                if (data.status === 10 && data.result?.response === true) {
                    notificationSystem.show('Thank you for subscribing to our newsletter!', 'success');
                    document.getElementById('subscriptionEmail').value = '';
                } else if (data.status === 11 && data.errorMessage === "Subscription already exists") {
                    notificationSystem.show('This email is already subscribed to our newsletter.', 'error');
                    document.getElementById('subscriptionEmail').value = '';
                } else {
                    notificationSystem.show(data.errorMessage || 'Subscription failed. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                notificationSystem.show('An error occurred. Please try again later.', 'error');
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    let mobileNav = document.querySelector('.mobile-nav');
    
    // Create mobile nav if it doesn't exist
    if (menuToggle && !mobileNav) {
        mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        
        // Create close button
        const closeBtn = document.createElement('div');
        closeBtn.className = 'mobile-nav-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        // Create links container
        const links = document.createElement('div');
        links.className = 'mobile-nav-links';
        
        // Clone desktop navigation links for mobile
        const desktopLinks = document.querySelector('.nav-links');
        if (desktopLinks) {
            const desktopLinksClone = desktopLinks.cloneNode(true);
            Array.from(desktopLinksClone.children).forEach(link => {
                links.appendChild(link.cloneNode(true));
            });
        }
        
        // Create CTA buttons container
        const ctaButtons = document.createElement('div');
        ctaButtons.className = 'mobile-cta-buttons';
        
        // Clone desktop CTA buttons for mobile
        const desktopCTA = document.querySelector('.cta-buttons');
        if (desktopCTA) {
            const desktopCTAClone = desktopCTA.cloneNode(true);
            Array.from(desktopCTAClone.children).forEach(button => {
                ctaButtons.appendChild(button.cloneNode(true));
            });
        }
        
        // Append elements to mobile nav
        mobileNav.appendChild(closeBtn);
        mobileNav.appendChild(links);
        mobileNav.appendChild(ctaButtons);
        
        // Append mobile nav to body
        document.body.appendChild(mobileNav);
    }
    
    // Toggle mobile navigation
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile navigation
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    if (mobileNavClose && mobileNav) {
        mobileNavClose.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Text Typing Animation
    const highlightElement = document.querySelector('.highlight');
    const rotatorItems = document.querySelectorAll('.rotator-item');
    let currentPhraseIndex = 0;
    let isTyping = false;
    
    // Start with first typing effect
    if (highlightElement && rotatorItems && rotatorItems.length > 0) {
        startTypingAnimation(rotatorItems[0].textContent);
    }
    
    // Function to animate typing effect
    function startTypingAnimation(text) {
        if (isTyping || !highlightElement || !text) return;
        isTyping = true;
        
        // Clear the text initially
        highlightElement.textContent = '';
        
        // Type out the text one letter at a time
        let letterIndex = 0;
        const letterDelay = 70; // milliseconds between each letter
        
        const typeInterval = setInterval(() => {
            if (letterIndex < text.length) {
                highlightElement.textContent += text[letterIndex];
                letterIndex++;
            } else {
                clearInterval(typeInterval);
                isTyping = false;
                
                // Wait and then rotate to next text
                setTimeout(() => {
                    rotateToNextPhrase();
                }, 2000); // Wait 2 seconds before showing next phrase
            }
        }, letterDelay);
    }
    
    // Function to rotate to the next phrase
    function rotateToNextPhrase() {
        if (!rotatorItems || rotatorItems.length <= 1) return;
        
        // Hide current item
        rotatorItems[currentPhraseIndex].classList.remove('active');
        
        // Move to next phrase
        currentPhraseIndex = (currentPhraseIndex + 1) % rotatorItems.length;
        
        // Show next item
        rotatorItems[currentPhraseIndex].classList.add('active');
        
        // Start typing the new phrase
        startTypingAnimation(rotatorItems[currentPhraseIndex].textContent);
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        
        question.addEventListener('click', () => {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle icon
            const icon = question.querySelector('.toggle-icon i');
            if (icon) {
                if (item.classList.contains('active')) {
                    icon.className = 'fas fa-minus';
                } else {
                    icon.className = 'fas fa-plus';
                }
            }
        });
    });
    
    // Business Card Savings Calculator
    const employeesInput = document.getElementById('employees');
    const employeesRange = document.getElementById('employees-range');
    const cardsPerEmployeeInput = document.getElementById('cards-per-employee');
    const cardsRange = document.getElementById('cards-range');
    const costPerCardInput = document.getElementById('cost-per-card');
    const costRange = document.getElementById('cost-range');
    const traditionalCostOutput = document.getElementById('traditional-cost');
    const digitalCostOutput = document.getElementById('digital-cost');
    const totalSavingsOutput = document.getElementById('total-savings');
    const treesSavedOutput = document.getElementById('trees-saved');
    const waterSavedOutput = document.getElementById('water-saved');
    const carbonSavedOutput = document.getElementById('carbon-saved');
    
    // Function to synchronize number inputs with range sliders
    function syncInputs() {
        if (!employeesInput || !employeesRange || !cardsPerEmployeeInput || !cardsRange || !costPerCardInput || !costRange) return;
        
        // Sync employees
        employeesInput.addEventListener('input', function() {
            employeesRange.value = this.value;
            updateCalculator();
        });
        
        employeesRange.addEventListener('input', function() {
            employeesInput.value = this.value;
            updateCalculator();
        });
        
        // Sync cards per employee
        cardsPerEmployeeInput.addEventListener('input', function() {
            cardsRange.value = this.value;
            updateCalculator();
        });
        
        cardsRange.addEventListener('input', function() {
            cardsPerEmployeeInput.value = this.value;
            updateCalculator();
        });
        
        // Sync cost per card
        costPerCardInput.addEventListener('input', function() {
            costRange.value = this.value;
            updateCalculator();
        });
        
        costRange.addEventListener('input', function() {
            costPerCardInput.value = this.value;
            updateCalculator();
        });
    }
    
    // Function to calculate and update costs
    function updateCalculator() {
        if (!employeesInput || !cardsPerEmployeeInput || !costPerCardInput) return;
        
        const employees = parseInt(employeesInput.value) || 0;
        const cardsPerEmployee = parseInt(cardsPerEmployeeInput.value) || 0;
        const costPerCard = parseFloat(costPerCardInput.value) || 0;
        
        // Calculate traditional cost
        const traditionalCost = employees * cardsPerEmployee * costPerCard;
        
        // Calculate digital cost - $34.30 per employee per year
        const digitalCost = employees * 34.30;
        
        // Calculate total savings
        const totalSavings = traditionalCost - digitalCost;
        
        // Update the display with proper formatting
        traditionalCostOutput.textContent = '$' + formatNumber(traditionalCost);
        digitalCostOutput.textContent = '$' + formatNumber(digitalCost);
        totalSavingsOutput.textContent = '$' + formatNumber(totalSavings);
        
        // Calculate and update environmental impact
        // Trees: Approximately 1 tree produces ~8,333 business cards
        const trees = Math.round((employees * cardsPerEmployee) / 8333);
        // Water: Approximately 3 gallons per 100 cards
        const water = Math.round((employees * cardsPerEmployee) * 0.03) * 1000;
        // CO2: Approximately 0.2 lb CO2 per card
        const carbon = Math.round((employees * cardsPerEmployee) * 0.2) * 15;
        
        // Update impact values
        treesSavedOutput.textContent = formatNumber(trees);
        waterSavedOutput.textContent = formatNumber(water);
        carbonSavedOutput.textContent = formatNumber(carbon);
    }
    
    // Format number with commas
    function formatNumber(num) {
        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 0
        }).format(Math.round(num));
    }
    
    // Initialize calculator if elements exist
    if (employeesInput && cardsPerEmployeeInput && costPerCardInput) {
        syncInputs();
        updateCalculator();
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileNav) {
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // Animation on Scroll
    function revealOnScroll() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('reveal');
            }
        });
    }
    
    // Add reveal class on load
    window.addEventListener('load', revealOnScroll);
    
    // Add reveal class on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Show 'Coming Soon' for social links and Blog link (only on original links, not clones)
    let comingSoonNotification = null;
    document.querySelectorAll('a.coming-soon').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            // Remove any existing notification
            if (comingSoonNotification) {
                notificationSystem.remove(comingSoonNotification);
            }
            comingSoonNotification = notificationSystem.show(
                '<strong>Coming Soon!</strong><br>These features will be available soon. Stay tuned!',
                'info',
                2500
            );
        });
    });

    // Business Slider (For Businesses & Service Providers section)
    const slider = document.getElementById('businessSlider');
    if (slider) {
        const images = slider.querySelectorAll('.slider-image');
        const dots = slider.querySelectorAll('.slider-dots .dot');
        
        // Only proceed if we have images
        if (images && images.length > 0) {
            let current = 0;
            let sliderInterval = null;

            function showSlide(index) {
                images.forEach((img, i) => {
                    img.classList.toggle('active', i === index);
                });
                
                if (dots && dots.length > 0) {
                    dots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === index);
                    });
                }
                
                current = index;
            }

            function nextSlide() {
                let next = (current + 1) % images.length;
                showSlide(next);
            }

            // Auto-slide every 3.5 seconds
            sliderInterval = setInterval(nextSlide, 3500);

            // Add click events to dots if they exist
            if (dots && dots.length > 0) {
                dots.forEach((dot, i) => {
                    dot.addEventListener('click', () => {
                        clearInterval(sliderInterval);
                        showSlide(i);
                        sliderInterval = setInterval(nextSlide, 3500);
                    });
                });
            }

            // Start with first slide
            showSlide(0);
        }
    }
});

