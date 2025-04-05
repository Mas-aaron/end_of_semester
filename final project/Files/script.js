// Mobile Menu Toggle
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

// Initialize Swiper
document.addEventListener('DOMContentLoaded', function() {
  const coursesSlider = new Swiper('.courses-slider', {
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
          }
      }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
});

// Sticky Header
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

// Initialize Hero Swiper
var heroSwiper = new Swiper(".heroSwiper", {
  direction: "horizontal",
  loop: true,
  autoplay: {
      delay: 6000,
      disableOnInteraction: false,
  },
  effect: "creative",
  creativeEffect: {
      prev: {
          translate: ["-120%", 0, -500],
          opacity: 0,
      },
      next: {
          translate: ["120%", 0, -500],
          opacity: 0,
      },
  },
  speed: 1000,
  pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
          return '<span class="' + className + '">0' + (index + 1) + '</span>';
      },
  },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
});

var heroSwiper = new Swiper(".heroSwiper", {
  direction: "horizontal",
  loop: true,
  autoplay: {
      delay: 6000,
      disableOnInteraction: false,
  },
  effect: "creative",
  creativeEffect: {
      prev: {
          translate: ["-120%", 0, -500],
          opacity: 0,
      },
      next: {
          translate: ["120%", 0, -500],
          opacity: 0,
      },
  },
  speed: 1000,
  pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
          return '<span class="' + className + '">0' + (index + 1) + '</span>';
      },
  },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
});


// Initialize Courses Swiper course section
const coursesSwiper = new Swiper('.courses-slider', {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
      el: '.swiper-pagination-courses',
      clickable: true,
  },
  navigation: {
      nextEl: '.swiper-button-next-courses',
      prevEl: '.swiper-button-prev-courses',
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

// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}

// Toggle password visibility
document.querySelector('.toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

// Form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your login logic here
    console.log('Form submitted');
    // You would typically validate and send to server here
});
