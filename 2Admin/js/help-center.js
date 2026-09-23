document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');
        const icon = header.querySelector('i');
        
        header.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-content').style.maxHeight = '0';
                    otherItem.querySelector('.faq-header i').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            const isActive = item.classList.contains('active');
            item.classList.toggle('active');
            
            if (!isActive) {
                // Add a 20px buffer to ensure content isn't cut off
                content.style.maxHeight = (content.scrollHeight + 20) + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                content.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.help-search-container .search-input');
    const quickLinks = document.querySelectorAll('.quick-link-card');
    const faqHeaders = document.querySelectorAll('.faq-header h3');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        // Search in quick links
        quickLinks.forEach(link => {
            const title = link.querySelector('h3').textContent.toLowerCase();
            const description = link.querySelector('p').textContent.toLowerCase();
            const isMatch = title.includes(searchTerm) || description.includes(searchTerm);
            link.style.display = isMatch ? 'block' : 'none';
        });

        // Search in FAQs
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-header h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-content p').textContent.toLowerCase();
            const isMatch = question.includes(searchTerm) || answer.includes(searchTerm);
            item.style.display = isMatch ? 'block' : 'none';

            // If there's a match and we're searching, expand the FAQ
            if (isMatch && searchTerm.length > 0) {
                item.classList.add('active');
                const content = item.querySelector('.faq-content');
                // Add a 20px buffer to ensure content isn't cut off
                content.style.maxHeight = (content.scrollHeight + 20) + 'px';
                item.querySelector('.faq-header i').style.transform = 'rotate(180deg)';
            } else if (searchTerm.length === 0) {
                // If search is cleared, collapse all FAQs
                item.classList.remove('active');
                item.querySelector('.faq-content').style.maxHeight = '0';
                item.querySelector('.faq-header i').style.transform = 'rotate(0deg)';
            }
        });

        // Show/hide sections based on search results
        const quickLinksSection = document.querySelector('.quick-links');
        const faqSection = document.querySelector('.faq-section');

        const hasQuickLinkResults = Array.from(quickLinks).some(link => 
            link.style.display !== 'none');
        const hasFaqResults = Array.from(faqItems).some(item => 
            item.style.display !== 'none');

        quickLinksSection.style.display = hasQuickLinkResults ? 'block' : 'none';
        faqSection.style.display = hasFaqResults ? 'block' : 'none';
    });
}); 