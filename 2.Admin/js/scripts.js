// Mobile menu functionality
class MobileMenu {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.sideMenu = document.querySelector('.side-menu');
        this.menuItems = document.querySelectorAll('.menu-item');
        this.init();
    }

    init() {
        if (this.menuToggle && this.sideMenu) {
            this.menuToggle.addEventListener('click', this.toggleMenu.bind(this));
            document.addEventListener('click', this.handleOutsideClick.bind(this));
            this.menuItems.forEach(item => {
                item.addEventListener('click', this.handleMenuItemClick.bind(this));
            });
        }
    }

    toggleMenu(event) {
        event.stopPropagation();
        this.sideMenu.classList.toggle('active');
        this.toggleIcon();
    }

    toggleIcon() {
        const icon = this.menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    }

    handleOutsideClick(event) {
        if (window.innerWidth <= 768) {
            if (!event.target.closest('.side-menu') && 
                !event.target.closest('.menu-toggle') && 
                this.sideMenu.classList.contains('active')) {
                this.sideMenu.classList.remove('active');
                this.resetIcon();
            }
        }
    }

    handleMenuItemClick() {
        if (window.innerWidth <= 768) {
            this.sideMenu.classList.remove('active');
            this.resetIcon();
        }
    }

    resetIcon() {
        const icon = this.menuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

// Profile dropdown functionality
class ProfileDropdown {
    constructor() {
        this.profileToggles = document.querySelectorAll('.profile-toggle');
        this.profileDropdown = document.querySelector('.profile-dropdown');
        this.init();
    }

    init() {
        if (this.profileDropdown) {
            this.profileToggles.forEach(toggle => {
                toggle.addEventListener('click', this.toggleDropdown.bind(this));
            });
            document.addEventListener('click', this.handleOutsideClick.bind(this));
        }
    }

    toggleDropdown(event) {
        event.stopPropagation();
       
        this.profileDropdown.classList.toggle('active');
        this.toggleChevron(event.currentTarget);
    }

    toggleChevron(toggle) {
        const chevron = toggle.querySelector('.fa-chevron-up');
        if (chevron) {
            chevron.style.transform = this.profileDropdown.classList.contains('active') 
                ? 'rotate(180deg)' 
                : 'rotate(0deg)';
        }
    }

    handleOutsideClick(event) {
        if (!event.target.closest('.profile-dropdown') && 
            !event.target.closest('.profile-toggle')) {
            this.profileDropdown.classList.remove('active');
            this.resetChevrons();
        }
    }

    resetChevrons() {
        document.querySelectorAll('.profile-toggle .fa-chevron-up').forEach(chevron => {
            chevron.style.transform = 'rotate(0deg)';
        });
    }
}

// Shop dropdown functionality
class ShopDropdown {
    constructor() {
        this.shopDropdown = document.querySelector('.menu-item-dropdown');
        this.shopToggle = document.querySelector('.menu-item-dropdown .menu-item');
        this.init();
    }

    init() {
        if (this.shopDropdown && this.shopToggle) {
            this.shopToggle.addEventListener('click', this.toggleDropdown.bind(this));
            document.addEventListener('click', this.handleOutsideClick.bind(this));
        }
    }

    toggleDropdown(event) {
        event.preventDefault();
        event.stopPropagation();
        
        this.shopDropdown.classList.toggle('active');
    }

    handleOutsideClick(event) {
        if (!event.target.closest('.menu-item-dropdown')) {
            this.shopDropdown.classList.remove('active');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new MobileMenu();
    new ProfileDropdown();
    new ShopDropdown();
}); 