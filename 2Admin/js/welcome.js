document.addEventListener('DOMContentLoaded', function() {
    // Add animation to the Get Started button
    const getStartedBtn = document.querySelector('.welcome-button');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('mouseenter', function() {
            const arrowIcon = this.querySelector('.arrow-icon');
            if (arrowIcon) {
                arrowIcon.style.transition = 'transform 0.3s ease';
                arrowIcon.style.transform = 'translateX(5px)';
            }
        });
        
        getStartedBtn.addEventListener('mouseleave', function() {
            const arrowIcon = this.querySelector('.arrow-icon');
            if (arrowIcon) {
                arrowIcon.style.transform = 'translateX(0)';
            }
        });
    }
});