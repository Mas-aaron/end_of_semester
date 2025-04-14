
// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    
    themeIcon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
});

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
themeIcon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";

// Initialize Swipers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Courses Swiper
    const coursesSwiper = new Swiper('.courses-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            }
        }
    });
    
    // Testimonials Swiper
    const testimonialsSwiper = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            }
        }
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navLinks = document.getElementById("navLinks");
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.stat-card, .course-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.animation = 'fadeIn 0.6s ease forwards';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});

// Initialize Hero Swiper when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
// Hero Swiper
const heroSwiper = new Swiper('.hero-slider', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

});


// Mobile search functionality - YouTube style
document.addEventListener('DOMContentLoaded', function() {
    const searchContainer = document.querySelector('.search-container');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.querySelector('.search-input');
    const header = document.querySelector('.header');
    const logo = document.querySelector('.logo');
    const navbar = document.querySelector('.navbar');
    
    // Mobile search toggle
    function setupMobileSearch() {
        if (window.innerWidth <= 768) {
            // Initialize mobile search state
            searchContainer.classList.remove('active');
            
            // Search button click handler
            searchButton.addEventListener('click', function(e) {
                if (!searchContainer.classList.contains('active')) {
                    e.preventDefault();
                    // Expand search
                    searchContainer.classList.add('active');
                    header.classList.add('search-active');
                    logo.style.display = 'none';
                    
                    // Focus input after slight delay for animation
                    setTimeout(() => {
                        searchInput.focus();
                    }, 100);
                } else if (searchInput.value.trim() === '') {
                    // Collapse search if empty
                    collapseSearch();
                } else {
                    // Perform search if there's input
                    performSearch(searchInput.value);
                }
            });
            
            // Close search when clicking outside
            document.addEventListener('click', function(e) {
                if (searchContainer.classList.contains('active') &&
                    !searchContainer.contains(e.target) &&
                    e.target !== searchButton) {
                    collapseSearch();
                }
            });
            
            // Close search when pressing escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
                    collapseSearch();
                }
            });
            
            // Handle search input
            searchInput.addEventListener('keyup', function(e) {
                if (e.key === 'Enter') {
                    performSearch(searchInput.value);
                }
            });
        }
    }
    
    function collapseSearch() {
        searchContainer.classList.remove('active');
        header.classList.remove('search-active');
        logo.style.display = 'flex';
        searchInput.value = '';
        searchInput.blur();
    }
    
    function performSearch(query) {
        if (query.trim() !== '') {
            // Redirect to search results page with query parameter
            window.location.href = `/search?q=${encodeURIComponent(query)}`;
            console.log('Searching for:', query); // For debugging
            collapseSearch();
        }
    }
    
    // Initialize on load
    setupMobileSearch();
    
    // Re-initialize on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset to desktop styles
            searchContainer.classList.remove('active');
            header.classList.remove('search-active');
            logo.style.display = 'flex';
            searchInput.value = '';
        }
        // Remove existing listeners to prevent duplicates
        searchButton.removeEventListener('click', searchButton.onclick);
        document.removeEventListener('click', document.onclick);
        document.removeEventListener('keydown', document.onkeydown);
        searchInput.removeEventListener('keyup', searchInput.onkeyup);
        setupMobileSearch();
    });
});