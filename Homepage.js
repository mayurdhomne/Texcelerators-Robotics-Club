// Main JavaScript for Our Robots Page 

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Menu Toggle
 // Navigation System JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const header = document.getElementById('main-header');
  const sidebar = document.getElementById('sidebar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const mainContent = document.getElementById('main-content');
  const body = document.body;
  
  // Navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sections = document.querySelectorAll('section[id]');
  
  // State variables
  let isMenuOpen = false;
  let isSidebarMode = false;
  let lastScrollTop = 0;
  
  // Initialize the application
  init();
  
  function init() {
      setupEventListeners();
      checkScrollPosition();
      updateActiveSection();
  }
  
  function setupEventListeners() {
      // Hamburger menu toggle
      if (hamburgerBtn) {
          hamburgerBtn.addEventListener('click', toggleMenu);
      }
      
      // Navigation links
      navLinks.forEach(link => {
          link.addEventListener('click', handleNavClick);
      });
      
      sidebarLinks.forEach(link => {
          link.addEventListener('click', handleNavClick);
      });
      
      // Scroll events
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
          if (isMenuOpen && header && !header.contains(e.target)) {
              closeMenu();
          }
      });
  }
  
  // Menu functionality
  function toggleMenu() {
      if (isMenuOpen) {
          closeMenu();
      } else {
          openMenu();
      }
  }
  
  function openMenu() {
      isMenuOpen = true;
      if (hamburgerBtn) hamburgerBtn.classList.add('active');
      if (navMenu) navMenu.classList.add('active');
      
      // Animate menu items
      const menuItems = navMenu ? navMenu.querySelectorAll('.nav-link') : [];
      menuItems.forEach((item, index) => {
          setTimeout(() => {
              item.style.transform = 'translateY(0)';
              item.style.opacity = '1';
          }, index * 50);
      });
  }
  
  function closeMenu() {
      isMenuOpen = false;
      if (hamburgerBtn) hamburgerBtn.classList.remove('active');
      if (navMenu) navMenu.classList.remove('active');
      
      // Reset menu items
      const menuItems = navMenu ? navMenu.querySelectorAll('.nav-link') : [];
      menuItems.forEach(item => {
          item.style.transform = 'translateY(-20px)';
          item.style.opacity = '0';
      });
  }
  
  // Navigation click handler
  function handleNavClick(e) {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
          const offsetTop = targetSection.offsetTop - (isSidebarMode ? 0 : 80);
          
          window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
          });
          
          closeMenu();
      }
  }
  
  // Scroll handler
  function handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const achievementsSection = document.getElementById('achievements');
      
      if (achievementsSection) {
          const achievementsTop = achievementsSection.offsetTop - 200;
          const shouldShowSidebar = scrollTop >= achievementsTop;
          
          if (shouldShowSidebar && !isSidebarMode) {
              activateSidebarMode();
          } else if (!shouldShowSidebar && isSidebarMode) {
              deactivateSidebarMode();
          }
      }
      
      // Update active section
      updateActiveSection();
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
  
  function activateSidebarMode() {
      isSidebarMode = true;
      body.classList.add('sidebar-active');
      if (sidebar) sidebar.classList.add('active');
      closeMenu();
      
      // Add entrance animation
      setTimeout(() => {
          if (sidebar) sidebar.style.transform = 'translateX(0)';
      }, 100);
  }
  
  function deactivateSidebarMode() {
      isSidebarMode = false;
      body.classList.remove('sidebar-active');
      if (sidebar) sidebar.classList.remove('active');
  }
  
  function handleResize() {
      checkScrollPosition();
  }
  
  function checkScrollPosition() {
      // Recalculate positions on resize
      updateActiveSection();
  }
  
  // Update active section highlighting
  function updateActiveSection() {
      const scrollPosition = window.scrollY + 200;
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              // Update navbar links
              navLinks.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === `#${sectionId}`) {
                      link.classList.add('active');
                  }
              });
              
              // Update sidebar links
              sidebarLinks.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === `#${sectionId}`) {
                      link.classList.add('active');
                  }
              });
          }
      });
  }
  
  // Utility function to show notifications
  function showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;
      
      // Style the notification
      notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: ${type === 'success' ? 'var(--secondary)' : 'var(--primary)'};
          color: white;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          z-index: 10000;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          font-family: 'Outfit', sans-serif;
      `;
      
      document.body.appendChild(notification);
      
      // Animate in
      setTimeout(() => {
          notification.style.transform = 'translateX(0)';
      }, 100);
      
      // Remove after delay
      setTimeout(() => {
          notification.style.transform = 'translateX(100%)';
          setTimeout(() => {
              if (document.body.contains(notification)) {
                  document.body.removeChild(notification);
              }
          }, 300);
      }, 3000);
  }
  
  // Export functions for external use if needed
  window.NavbarSidebar = {
      init: init,
      toggleMenu: toggleMenu,
      openMenu: openMenu,
      closeMenu: closeMenu,
      activateSidebarMode: activateSidebarMode,
      deactivateSidebarMode: deactivateSidebarMode,
      updateActiveSection: updateActiveSection,
      showNotification: showNotification
  };
}); 
    
    // Scroll Spy for Navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    function activateNavByScroll() {
      const scrollPosition = window.scrollY;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('scroll-spy-active');
            
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('scroll-spy-active');
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', activateNavByScroll);
    activateNavByScroll(); // Initial check
    
    // Hero Slideshow
    const heroSlides = document.querySelectorAll('.slide');
    const slideDots = document.querySelectorAll('.slide-dot');
    const prevSlideBtn = document.querySelector('.slide-arrow.prev');
    const nextSlideBtn = document.querySelector('.slide-arrow.next');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
      heroSlides.forEach(slide => slide.classList.remove('active'));
      slideDots.forEach(dot => dot.classList.remove('active'));
      
      heroSlides[index].classList.add('active');
      slideDots[index].classList.add('active');
      currentSlide = index;
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % heroSlides.length;
      showSlide(currentSlide);
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
      showSlide(currentSlide);
    }
    
    function startSlideshow() {
      slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlideshow() {
      clearInterval(slideInterval);
    }
    
    if (heroSlides.length > 0) {
      // Setup dots
      slideDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          stopSlideshow();
          showSlide(index);
          startSlideshow();
        });
      });
      
      // Setup arrows
      if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', () => {
          stopSlideshow();
          prevSlide();
          startSlideshow();
        });
      }
      
      if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', () => {
          stopSlideshow();
          nextSlide();
          startSlideshow();
        });
      }
      
      // Initialize slideshow
      showSlide(0);
      startSlideshow();
      
      // Pause slideshow on hover
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        heroSection.addEventListener('mouseenter', stopSlideshow);
        heroSection.addEventListener('mouseleave', startSlideshow);
      }
    }
    
    // Counter Animation for Achievements
    const counters = document.querySelectorAll('.achievement-count');
    const animationDuration = 2000;
    
    function animateCounter(counter, targetValue) {
      let startTime;
      
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / animationDuration, 1);
        const currentCount = Math.floor(progress * targetValue);
        
        counter.textContent = currentCount;
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          counter.textContent = targetValue;
        }
      }
      
      window.requestAnimationFrame(step);
    }
    
    // Bots Carousel
    const botsSlider = document.querySelector('.bots-slider');
    const botSlides = document.querySelectorAll('.bot-slide');
    const botDots = document.querySelectorAll('.bot-dot');
    const prevBotBtn = document.querySelector('.bot-arrow.prev');
    const nextBotBtn = document.querySelector('.bot-arrow.next');
    let currentBotSlide = 0;
    let slidesToShow = 3;
    
    function updateSlidesToShow() {
      if (window.innerWidth < 768) {
        slidesToShow = 1;
      } else if (window.innerWidth < 1024) {
        slidesToShow = 2;
      } else {
        slidesToShow = 3;
      }
      
      updateBotSlider();
    }
    
    function updateBotSlider() {
      if (!botsSlider) return;
      
      const maxSlideIndex = Math.max(0, botSlides.length - slidesToShow);
      const slideWidth = 100 / slidesToShow;
      
      // Update slider position
      botsSlider.style.transform = `translateX(-${currentBotSlide * slideWidth}%)`;
      
      // Update slide widths
      botSlides.forEach(slide => {
        slide.style.minWidth = `${slideWidth}%`;
        slide.style.flex = `0 0 ${slideWidth}%`;
      });
      
      // Update dots
      botDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentBotSlide);
      });
      
      // Update buttons visibility
      if (prevBotBtn) {
        prevBotBtn.style.display = currentBotSlide > 0 ? 'flex' : 'none';
      }
      
      if (nextBotBtn) {
        nextBotBtn.style.display = currentBotSlide < maxSlideIndex ? 'flex' : 'none';
      }
    }
    
    function nextBotSlide() {
      const maxSlideIndex = Math.max(0, botSlides.length - slidesToShow);
      currentBotSlide = Math.min(currentBotSlide + 1, maxSlideIndex);
      updateBotSlider();
    }
    
    function prevBotSlide() {
      currentBotSlide = Math.max(currentBotSlide - 1, 0);
      updateBotSlider();
    }
    
    if (botsSlider) {
      window.addEventListener('resize', updateSlidesToShow);
      updateSlidesToShow(); // Initial setup
      
      // Setup buttons
      if (prevBotBtn) {
        prevBotBtn.addEventListener('click', prevBotSlide);
      }
      
      if (nextBotBtn) {
        nextBotBtn.addEventListener('click', nextBotSlide);
      }
      
      // Setup dots
      botDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          currentBotSlide = index;
          updateBotSlider();
        });
      });
    }
    
    // Animate on Scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkInView() {
      const windowHeight = window.innerHeight;
      const windowTop = window.scrollY;
      const windowBottom = windowTop + windowHeight;
      
      animatedElements.forEach(element => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const elementBottom = elementTop + elementHeight;
        
        // Check if element is in view
        if (elementBottom > windowTop && elementTop < windowBottom) {
          element.classList.add('visible');
        }
      });
    }
    
    window.addEventListener('scroll', checkInView);
    window.addEventListener('resize', checkInView);
    checkInView(); // Initial check
    
    // Start counters when they're in view
    function checkCounters() {
      counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        
        if (rect.top <= window.innerHeight && rect.bottom >= 0 && !counter.classList.contains('animated')) {
          const targetValue = parseInt(counter.getAttribute('data-count') || counter.textContent);
          animateCounter(counter, targetValue);
          counter.classList.add('animated');
        }
      });
    }
    
    window.addEventListener('scroll', checkCounters);
    checkCounters(); // Initial check
    
    // Form Submission (prevent actual submission for static version)
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('This is a static demo. In a real implementation, this form would submit data to a server.');
        contactForm.reset();
      });
    }
  });

  // Enhanced Bot Carousel JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Get all elements needed for the carousel
  const botsSlider = document.querySelector('.bots-slider');
  const botSlides = document.querySelectorAll('.bot-slide');
  const botDots = document.querySelectorAll('.bot-dot');
  const prevBotBtn = document.querySelector('.bot-arrow.prev');
  const nextBotBtn = document.querySelector('.bot-arrow.next');
  const autoplayToggleBtn = document.getElementById('bot-autoplay-toggle');
  const fullscreenToggleBtn = document.getElementById('bot-fullscreen-toggle');
  const botCarouselContainer = document.querySelector('.bot-carousel-container');
  
  // Variables for controlling the carousel
  let currentBotSlide = 0;
  let slidesToShow = 3;
  let isAutoplayActive = true;
  let isFullscreen = false;
  let botSlideInterval;
  let isAnimating = false;
  let touchStartX = 0;
  let touchStartY = 0;
  
  // Initialize the carousel
  function initBotCarousel() {
    updateSlidesToShow();
    setupEventListeners();
    startAutoplay();
    
    // Initial slide setup
    updateActiveSlide();
  }
  
  // Update the number of slides to show based on viewport width
  function updateSlidesToShow() {
    if (window.innerWidth < 768) {
      slidesToShow = 1;
    } else if (window.innerWidth < 1024) {
      slidesToShow = 2;
    } else {
      slidesToShow = 3;
    }
    
    updateBotSlider();
  }
  
  // Update the active slide and position the slider
  function updateBotSlider() {
    if (!botsSlider) return;
    
    const maxSlideIndex = Math.max(0, botSlides.length - slidesToShow);
    const slideWidth = 100 / slidesToShow;
    
    // Update slider position
    botsSlider.style.transform = `translateX(-${currentBotSlide * slideWidth}%)`;
    
    // Update slide widths
    botSlides.forEach(slide => {
      slide.style.minWidth = `${slideWidth}%`;
      slide.style.flex = `0 0 ${slideWidth}%`;
    });
    
    // Update dots
    botDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentBotSlide);
    });
    
    // Update buttons visibility
    if (prevBotBtn) {
      prevBotBtn.style.opacity = currentBotSlide > 0 ? '1' : '0.5';
    }
    
    if (nextBotBtn) {
      nextBotBtn.style.opacity = currentBotSlide < maxSlideIndex ? '1' : '0.5';
    }
  }
  
  // Helper function to update which slide is visually active
  function updateActiveSlide() {
    botSlides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentBotSlide);
    });
  }
  
  // Go to next slide
  function nextBotSlide() {
    if (isAnimating) return;
    isAnimating = true;
    
    const maxSlideIndex = Math.max(0, botSlides.length - slidesToShow);
    currentBotSlide = Math.min(currentBotSlide + 1, maxSlideIndex);
    
    updateBotSlider();
    updateActiveSlide();
    
    // Reset animation lock after transition
    setTimeout(() => {
      isAnimating = false;
    }, 500); // Match this to your CSS transition duration
  }
  
  // Go to previous slide
  function prevBotSlide() {
    if (isAnimating) return;
    isAnimating = true;
    
    currentBotSlide = Math.max(currentBotSlide - 1, 0);
    
    updateBotSlider();
    updateActiveSlide();
    
    // Reset animation lock after transition
    setTimeout(() => {
      isAnimating = false;
    }, 500); // Match this to your CSS transition duration
  }
  
  // Go to a specific slide
  function goToBotSlide(index) {
    if (isAnimating || index === currentBotSlide) return;
    isAnimating = true;
    
    currentBotSlide = index;
    
    updateBotSlider();
    updateActiveSlide();
    
    // Reset animation lock after transition
    setTimeout(() => {
      isAnimating = false;
    }, 500); // Match this to your CSS transition duration
  }
  
  // Start autoplay
  function startAutoplay() {
    stopAutoplay(); // Clear any existing interval
    
    if (isAutoplayActive) {
      botSlideInterval = setInterval(() => {
        const maxSlideIndex = Math.max(0, botSlides.length - slidesToShow);
        
        if (currentBotSlide < maxSlideIndex) {
          nextBotSlide();
        } else {
          // Reset to first slide when reaching the end
          currentBotSlide = 0;
          updateBotSlider();
          updateActiveSlide();
        }
      }, 5000); // 5 seconds interval
    }
  }
  
  // Stop autoplay
  function stopAutoplay() {
    if (botSlideInterval) {
      clearInterval(botSlideInterval);
      botSlideInterval = null;
    }
  }
  
  // Toggle autoplay on/off
  function toggleAutoplay() {
    isAutoplayActive = !isAutoplayActive;
    
    if (autoplayToggleBtn) {
      autoplayToggleBtn.innerHTML = isAutoplayActive
        ? '<i class="fas fa-pause"></i>'
        : '<i class="fas fa-play"></i>';
    }
    
    if (isAutoplayActive) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
  }
  
  // Toggle fullscreen mode
  function toggleFullscreen() {
    isFullscreen = !isFullscreen;
    
    if (fullscreenToggleBtn) {
      fullscreenToggleBtn.innerHTML = isFullscreen
        ? '<i class="fas fa-compress"></i>'
        : '<i class="fas fa-expand"></i>';
    }
    
    if (botCarouselContainer) {
      if (isFullscreen) {
        botCarouselContainer.classList.add('fullscreen');
        document.body.style.overflow = 'hidden';
      } else {
        botCarouselContainer.classList.remove('fullscreen');
        document.body.style.overflow = '';
      }
    }
  }
  
  // Setup all event listeners
  function setupEventListeners() {
    // Window resize
    window.addEventListener('resize', () => {
      updateSlidesToShow();
    });
    
    // Previous and next buttons
    if (prevBotBtn) {
      prevBotBtn.addEventListener('click', () => {
        prevBotSlide();
        if (isAutoplayActive) {
          startAutoplay(); // Reset the timer
        }
      });
    }
    
    if (nextBotBtn) {
      nextBotBtn.addEventListener('click', () => {
        nextBotSlide();
        if (isAutoplayActive) {
          startAutoplay(); // Reset the timer
        }
      });
    }
    
    // Navigation dots
    botDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToBotSlide(index);
        if (isAutoplayActive) {
          startAutoplay(); // Reset the timer
        }
      });
    });
    
    // Control buttons
    if (autoplayToggleBtn) {
      autoplayToggleBtn.addEventListener('click', toggleAutoplay);
    }
    
    if (fullscreenToggleBtn) {
      fullscreenToggleBtn.addEventListener('click', toggleFullscreen);
    }
    
    // Touch events for swipe on mobile
    if (botCarouselContainer) {
      botCarouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        stopAutoplay();
      }, { passive: true });
      
      botCarouselContainer.addEventListener('touchmove', (e) => {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        // Only prevent default if horizontal scroll is greater than vertical
        if (Math.abs(diffX) > Math.abs(diffY)) {
          e.preventDefault();
        }
      }, { passive: false });
      
      botCarouselContainer.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchEndX - touchStartX;
        const threshold = 50; // Minimum distance to be considered a swipe
        
        if (diffX > threshold) {
          prevBotSlide(); // Swipe right = previous slide
        } else if (diffX < -threshold) {
          nextBotSlide(); // Swipe left = next slide
        }
        
        // Resume autoplay if it was active
        if (isAutoplayActive) {
          startAutoplay();
        }
      }, { passive: true });
    }
    
    // Pause autoplay on hover
    if (botCarouselContainer) {
      botCarouselContainer.addEventListener('mouseenter', () => {
        stopAutoplay();
      });
      
      botCarouselContainer.addEventListener('mouseleave', () => {
        if (isAutoplayActive) {
          startAutoplay();
        }
      });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      // Only if the carousel is in focus or in fullscreen mode
      if (isFullscreen || botCarouselContainer.contains(document.activeElement)) {
        if (e.key === 'ArrowLeft') {
          prevBotSlide();
          if (isAutoplayActive) startAutoplay();
        } else if (e.key === 'ArrowRight') {
          nextBotSlide();
          if (isAutoplayActive) startAutoplay();
        } else if (e.key === 'Escape' && isFullscreen) {
          toggleFullscreen();
        }
      }
    });
    
    // Details buttons
    const detailButtons = document.querySelectorAll('.bot-details-button');
    detailButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const botCard = button.closest('.bot-card');
        const botTitle = botCard.querySelector('.bot-card-title').textContent;
        alert(`Details for ${botTitle} will be shown in a modal in the full implementation.`);
      });
    });
  }
  
  // Initialize the carousel when DOM is loaded
  if (botsSlider && botSlides.length > 0) {
    initBotCarousel();
  }
});

// Add to main.js
function handleResponsiveLayouts() {
  // Handle mobile menu height
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    const headerHeight = document.querySelector('header').offsetHeight;
    mobileMenu.style.height = `calc(100vh - ${headerHeight}px)`;
  }

  // Recalculate carousel dimensions
  updateSlidesToShow();
  
  // Update animations for mobile
  if (window.innerWidth < 768) {
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      element.style.transform = 'none';
      element.style.opacity = '1';
    });
  }
}

// Add resize listener
window.addEventListener('resize', debounce(handleResponsiveLayouts, 250));

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* 
  To add a new robot:
  1. Copy the template HTML from the comments in the HTML file
  2. Customize the content (name, description, specs, tags, etc.)
  3. Add a high-quality image URL for the robot
  4. The JavaScript will automatically handle the new slide
*/

document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const header = document.getElementById('main-header');
  const sidebar = document.getElementById('sidebar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const body = document.body;

  const navLinks = document.querySelectorAll('.nav-link');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sections = document.querySelectorAll('section[id]');

  let isMenuOpen = false;
  let isSidebarMode = false;

  // Init
  setupEventListeners();
  updateActiveSection();

  function setupEventListeners() {
      // Hamburger menu toggle
      if (hamburgerBtn) {
          hamburgerBtn.addEventListener('click', toggleMenu);
      }

      // Nav + sidebar link click behavior
      navLinks.forEach(link => {
          link.addEventListener('click', handleNavClick);
      });

      sidebarLinks.forEach(link => {
          link.addEventListener('click', handleNavClick);
      });

      // Close nav menu if clicked outside
      document.addEventListener('click', (e) => {
          if (isMenuOpen && !header.contains(e.target)) {
              closeMenu();
          }
      });

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', updateActiveSection);
  }

  function toggleMenu() {
      isMenuOpen ? closeMenu() : openMenu();
  }

  function openMenu() {
      isMenuOpen = true;
      hamburgerBtn.classList.add('active');
      navMenu.classList.add('active');

      // Animate menu items
      const menuItems = navMenu.querySelectorAll('.nav-link');
      menuItems.forEach((item, index) => {
          setTimeout(() => {
              item.style.transform = 'translateY(0)';
              item.style.opacity = '1';
          }, index * 50);
      });
  }

  function closeMenu() {
      isMenuOpen = false;
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('active');

      // Reset menu items
      const menuItems = navMenu.querySelectorAll('.nav-link');
      menuItems.forEach(item => {
          item.style.transform = 'translateY(-20px)';
          item.style.opacity = '0';
      });
  }

  function handleNavClick(e) {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
          const offsetTop = targetSection.offsetTop - (isSidebarMode ? 0 : 80);
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          closeMenu();
      }
  }

  function handleScroll() {
      const scrollTop = window.pageYOffset;
      const achievementsSection = document.getElementById('achievements');

      if (achievementsSection) {
          const achievementsTop = achievementsSection.offsetTop - 200;
          const shouldShowSidebar = scrollTop >= achievementsTop;

          if (shouldShowSidebar && !isSidebarMode) {
              activateSidebarMode();
          } else if (!shouldShowSidebar && isSidebarMode) {
              deactivateSidebarMode();
          }
      }

      updateActiveSection();
  }

  function activateSidebarMode() {
      isSidebarMode = true;
      body.classList.add('sidebar-active');
      sidebar.classList.add('active');
      closeMenu();
      setTimeout(() => {
          sidebar.style.transform = 'translateX(0)';
      }, 100);
  }

  function deactivateSidebarMode() {
      isSidebarMode = false;
      body.classList.remove('sidebar-active');
      sidebar.classList.remove('active');
  }

  function updateActiveSection() {
      const scrollPosition = window.scrollY + 200;

      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');

          const isActive = scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight;

          navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}` && isActive);
          });

          sidebarLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}` && isActive);
          });
      });
  }
});
