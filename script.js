
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


document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    const checkVisibility = () => {
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.75) && 
                         (rect.bottom >= window.innerHeight * 0.25);
        
        if (isVisible) {
          section.classList.add('visible');
        }
      });
    };
    
    // Check on load
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
  });



  /* Add this JavaScript */
window.addEventListener('load', function() {
const preloader = document.querySelector('.preloader');
setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
    preloader.style.display = 'none';
    }, 500);
}, 4000);
});




// Add to script.js
function recommendCourses() {
    const interests = ['Programming', 'Design', 'Business', 'Kids'];
    const userInterest = interests[Math.floor(Math.random() * interests.length)];
    
    fetch(`/api/recommendations?interest=${userInterest}`)
      .then(response => response.json())
      .then(data => {
        const recommendationSection = document.createElement('div');
        recommendationSection.className = 'recommendation-banner';
        recommendationSection.innerHTML = `
          <div class="container">
            <h3>Based on your interest in ${userInterest}, we recommend:</h3>
            <div class="recommended-courses">
              ${data.courses.slice(0,3).map(course => `
                <div class="course-mini-card">
                  <img src="${course.thumbnail}" alt="${course.title}">
                  <h4>${course.title}</h4>
                  <button class="btn btn-sm">Explore</button>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        document.querySelector('.courses-section').prepend(recommendationSection);
      });
  }
  
  // Call on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', recommendCourses);


// Add Three.js implementation
function initLearningPath() {
    const canvas = document.getElementById('pathCanvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    // 3D scene setup with learning path visualization
  }




// Add to stats section
function updateLiveStats() {
    fetch('https://api.francisacademy.com/live-stats')
      .then(response => response.json())
      .then(data => {
        document.querySelector('.stat-number').textContent = `${data.students.toLocaleString()}+`;
        
        // Geolocation heatmap
        if (data.locations) {
          initHeatmap(data.locations);
        }
      });
  }
  
  setInterval(updateLiveStats, 30000);



// WebAR implementation
function initARPreview() {
    if (navigator.xr) {
      // Initialize WebXR
    } else {
      // Fallback to 3D model viewer
    }
  }



// Enhanced search functionality
function initVoiceSearch() {
    const voiceSearchBtn = document.createElement('button');
    voiceSearchBtn.className = 'voice-search-btn';
    voiceSearchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    
    voiceSearchBtn.addEventListener('click', () => {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.start();
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.querySelector('.search-input').value = transcript;
        performSearch(transcript);
      };
    });
    
    document.querySelector('.search-container').appendChild(voiceSearchBtn);
  }



// Progress tracking
function updateUserProgress() {
    fetch('/api/user-progress')
      .then(response => response.json())
      .then(data => {
        document.querySelector('.progress-fill').style.width = `${data.progress}%`;
        document.querySelector('.user-progress span').textContent = 
          `${data.progress}% to ${data.nextLevel}`;
      });
  }



// WebSocket implementation
function initCollaboration() {
    const socket = new WebSocket('wss://francisacademy.com/collab');
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'study_group') {
        showStudyGroupNotification(data.group);
      }
    };
  }
  
  function showStudyGroupNotification(group) {
    // Display notification about active study groups
  }





// Course Recommendation System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize recommendation swiper
    const recommendationSwiper = new Swiper('.recommendation-carousel', {
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
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      observer: true,
      observeParents: true
    });
  
    // Load initial recommendations
    loadRecommendations();
  
    // Refresh button functionality
    document.getElementById('refreshRecs').addEventListener('click', function() {
      this.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';
      loadRecommendations();
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Recommendations';
      }, 1000);
    });
  
    // Function to load recommendations
    function loadRecommendations() {
      const container = document.getElementById('recommendationContainer');
      container.innerHTML = '<div class="swiper-slide" style="text-align: center; padding: 2rem;"><i class="fas fa-spinner fa-spin"></i> Loading recommendations...</div>';
      
      // For demo purposes, we'll cycle through different interests
      const interests = ['Programming', 'Design', 'Business', 'Kids'];
      const randomInterest = interests[Math.floor(Math.random() * interests.length)];
      
      getRecommendedCourses(randomInterest)
        .then(courses => {
          if (courses && courses.length > 0) {
            renderRecommendedCourses(courses);
          } else {
            showNoRecommendations();
          }
        })
        .catch(error => {
          console.error('Error loading recommendations:', error);
          showError();
        });
    }
  
    // Function to render recommended courses
    function renderRecommendedCourses(courses) {
      const container = document.getElementById('recommendationContainer');
      container.innerHTML = '';
      
      courses.forEach(course => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
          <div class="recommendation-card">
            <div class="recomm-card-img">
              <img src="${course.image}" alt="${course.title}" onerror="this.src='https://via.placeholder.com/400x225?text=Course+Image'">
              <div class="recomm-badge">Recommended</div>
            </div>
            <div class="recomm-card-content">
              <h3>${course.title}</h3>
              <div class="recomm-meta">
                <span class="recomm-difficulty">${course.level}</span>
                <span class="recomm-rating"><i class="fas fa-star"></i> ${course.rating}</span>
              </div>
              <p class="course-description">${course.description}</p>
              <button class="btn btn-primary btn-enroll" data-course-id="${course.id}">
                <i class="fas fa-play-circle"></i> Start Learning
              </button>
            </div>
          </div>
        `;
        container.appendChild(slide);
      });
      
      // Update swiper after loading new slides
      recommendationSwiper.update();
      recommendationSwiper.slideTo(0);
    }
  
    // Show no recommendations message
    function showNoRecommendations() {
      const container = document.getElementById('recommendationContainer');
      container.innerHTML = `
        <div class="swiper-slide" style="text-align: center; padding: 2rem;">
          <i class="fas fa-book-open" style="font-size: 2rem; color: var(--text-tertiary); margin-bottom: 1rem;"></i>
          <p>No recommendations found.</p>
          <button class="btn btn-outline" onclick="loadRecommendations()">Try Again</button>
        </div>
      `;
    }
  
    // Show error message
    function showError() {
      const container = document.getElementById('recommendationContainer');
      container.innerHTML = `
        <div class="swiper-slide" style="text-align: center; padding: 2rem;">
          <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: var(--error); margin-bottom: 1rem;"></i>
          <p>Couldn't load recommendations.</p>
          <button class="btn btn-outline" onclick="loadRecommendations()">Retry</button>
        </div>
      `;
    }
  
    // Mock API function with better sample data
    function getRecommendedCourses(interest) {
      return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
          const courses = {
            Programming: [
              {
                id: 'python-fundamentals',
                title: 'Python Fundamentals',
                description: 'Master the basics of Python programming with hands-on exercises and real-world projects.',
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                level: 'Beginner',
                rating: '4.8',
                category: 'Programming'
              },
              {
                id: 'javascript-mastery',
                title: 'JavaScript Mastery',
                description: 'From basics to advanced concepts, become proficient in modern JavaScript development.',
                image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                level: 'Intermediate',
                rating: '4.9',
                category: 'Programming'
              },
              {
                id: 'web-development',
                title: 'Complete Web Development',
                description: 'Full-stack web development course covering HTML, CSS, JavaScript, and backend technologies.',
                image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                level: 'Beginner',
                rating: '4.7',
                category: 'Programming'
              }
            ],
            Design: [
              {
                id: 'ui-ux-design',
                title: 'UI/UX Design Principles',
                description: 'Learn the fundamentals of user interface and experience design with practical examples.',
                image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                level: 'Beginner',
                rating: '4.6',
                category: 'Design'
              },
              {
                id: 'graphic-design',
                title: 'Graphic Design Masterclass',
                description: 'Professional graphic design techniques using industry-standard tools and software.',
                image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80',
                level: 'Intermediate',
                rating: '4.8',
                category: 'Design'
              }
            ],
            Business: [
              {
                id: 'digital-marketing',
                title: 'Digital Marketing Fundamentals',
                description: 'Essential strategies for online marketing, SEO, social media, and content marketing.',
                image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
                level: 'Beginner',
                rating: '4.5',
                category: 'Business'
              }
            ],
            Kids: [
              {
                id: 'coding-for-kids',
                title: 'Coding for Kids',
                description: 'Fun and interactive programming course designed specifically for young learners.',
                image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
                level: 'Beginner',
                rating: '4.9',
                category: 'Kids'
              }
            ]
          };
  
          resolve(courses[interest] || []);
        }, 800);
      });
    }
  
    // Handle course enrollment clicks
    document.addEventListener('click', function(e) {
      if (e.target.closest('.btn-enroll')) {
        const courseId = e.target.closest('.btn-enroll').dataset.courseId;
        alert(`Course enrollment would start for: ${courseId}\n\nIn a real implementation, this would redirect to the course page or show a signup modal.`);
        // Example: window.location.href = `/course/${courseId}`;
      }
    });
  });
  
  // Make loadRecommendations available globally for buttons
  window.loadRecommendations = function() {
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  };