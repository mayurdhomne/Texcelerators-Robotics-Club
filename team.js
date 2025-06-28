/* ===============================
   TEAM PAGE ORGANIZED JAVASCRIPT
   ===============================
   
   TABLE OF CONTENTS:
   1. Page Initialization
   2. Loader Animation
   3. Navigation System
   4. Robot Assistant
   5. Visual Effects
   6. Scroll Animations
   7. Accessibility Features
   8. Utility Functions
   =============================== */

   document.addEventListener('DOMContentLoaded', () => {
  
    /* ===============================
       1. PAGE INITIALIZATION
       =============================== */
    
    // Initialize all main features
    initializeNavigation();
    initializeBackToTop();
    initializeRobotAssistant();
    initializeVisualEffects();
    initializeScrollAnimations();
    initializeAccessibility();
    

    // Back to Top Button Functionality
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) {
      // Create button if it doesn't exist
      const btn = document.createElement('button');
      btn.id = 'back-to-top';
      btn.className = 'back-to-top';
      btn.setAttribute('aria-label', 'Back to top');
      btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
      document.body.appendChild(btn);
    }
    
    const button = document.getElementById('back-to-top');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        button.classList.add('visible');
      } else {
        button.classList.remove('visible');
      }
    });
    
    // Scroll to top when button is clicked
    button.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
 

    /* ===============================
   ROBOT ASSISTANT & BACK TO TOP
   =============================== */

function initializeRobotAssistant() {
    const robotAssistantIcon = document.querySelector('.robot-assistant-icon');
    const robotAssistantDialog = document.getElementById('robot-assistant-dialog');
    const robotAssistantClose = document.getElementById('robot-assistant-close');
    const robotAssistantMessage = document.getElementById('robot-assistant-message');
    const robotOptions = document.querySelectorAll('.robot-option');
    const backToTopBtn = document.getElementById('back-to-top');
    
    // Check if elements exist
    if (!robotAssistantIcon || !robotAssistantDialog) return;
    
    // Messages for different sections
    const robotMessages = {
      'mentor-section': "Our mentor guides the team with years of experience and expertise. Would you like to learn about our other team members?",
      'leadership-section': "Our leadership team brings together experts in various fields of robotics. What else would you like to explore?",
      'core-section': "Our core team members are specialists who drive our projects forward. Can I help you navigate to other sections?",
      'junior-section': "Our junior members are the future of robotics innovation, bringing fresh ideas and enthusiasm. Where would you like to go next?",
      'alumni-section': "Our alumni have gone on to achieve great things in robotics and technology. Would you like to explore other sections?"
    };
    
    // Toggle dialog visibility when clicking the robot icon
    robotAssistantIcon.addEventListener('click', () => {
      robotAssistantDialog.classList.add('active');
    });
    
    // Close dialog when clicking the close button
    if (robotAssistantClose) {
      robotAssistantClose.addEventListener('click', () => {
        robotAssistantDialog.classList.remove('active');
      });
    }
    
    // Handle navigation options
    robotOptions.forEach(option => {
      option.addEventListener('click', () => {
        const sectionId = option.getAttribute('data-section');
        
        // Scroll to the selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          targetSection.scrollIntoView({ 
            behavior: 'smooth' 
          });
        }
        
        // Update the robot's message
        if (robotAssistantMessage && robotMessages[sectionId]) {
          robotAssistantMessage.textContent = robotMessages[sectionId];
        }
        
        // Close dialog after navigation
        setTimeout(() => {
          robotAssistantDialog.classList.remove('active');
        }, 1000);
      });
    });
    
    // Close dialog when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = robotAssistantDialog.contains(event.target) || 
                            robotAssistantIcon.contains(event.target);
      
      if (!isClickInside && robotAssistantDialog.classList.contains('active')) {
        robotAssistantDialog.classList.remove('active');
      }
    });
    
    // Prevent dialog from closing when clicking inside
    robotAssistantDialog.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  
    // Back to Top Button Functionality
    if (backToTopBtn) {
      // Show/hide back to top button based on scroll position
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });
      
      // Scroll to top when button is clicked
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }
  
    /* ===============================
       3. NAVIGATION SYSTEM
       =============================== */
    
    function initializeNavigation() {
      // DOM Elements
      const header = document.getElementById("main-header");
      const sidebar = document.getElementById("sidebar");
      const hamburgerBtn = document.getElementById("hamburger-btn");
      const navMenu = document.getElementById("nav-menu");
      const body = document.body;
  
      // Navigation links
      const navLinks = document.querySelectorAll(".nav-link");
      const sidebarLinks = document.querySelectorAll(".sidebar-link");
      const sections = document.querySelectorAll("section[id]");
  
      // State variables
      let isMenuOpen = false;
      let isSidebarMode = false;
      let lastScrollTop = 0;
  
      // Setup event listeners
      setupNavigationEvents();
      updateActiveSection();
  
      function setupNavigationEvents() {
        // Hamburger menu toggle
        if (hamburgerBtn) {
          hamburgerBtn.addEventListener("click", toggleMenu);
        }
  
        // Navigation link clicks
        navLinks.forEach((link) => {
          link.addEventListener("click", handleNavClick);
        });
  
        sidebarLinks.forEach((link) => {
          link.addEventListener("click", handleNavClick);
        });
  
        // Scroll events for sidebar activation and section highlighting
        window.addEventListener("scroll", throttle(handleScroll, 16)); // 60fps throttling
        window.addEventListener("resize", debounce(handleResize, 250));
  
        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
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
        if (hamburgerBtn) hamburgerBtn.classList.add("active");
        if (navMenu) navMenu.classList.add("active");
  
        // Animate menu items with stagger effect
        const menuItems = navMenu ? navMenu.querySelectorAll(".nav-link") : [];
        menuItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.transform = "translateY(0)";
            item.style.opacity = "1";
          }, index * 50);
        });
      }
  
      function closeMenu() {
        isMenuOpen = false;
        if (hamburgerBtn) hamburgerBtn.classList.remove("active");
        if (navMenu) navMenu.classList.remove("active");
  
        // Reset menu items
        const menuItems = navMenu ? navMenu.querySelectorAll(".nav-link") : [];
        menuItems.forEach((item) => {
          item.style.transform = "translateY(-20px)";
          item.style.opacity = "0";
        });
      }
  
      // Navigation click handler
      function handleNavClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
  
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - (isSidebarMode ? 0 : 120);
  
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
  
          closeMenu();
        }
      }
  
      // Scroll handler
      function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
        // Sidebar activation logic (desktop only)
        if (window.innerWidth > 768) {
          // Show sidebar when reaching mentor section (first team section)
          const mentorSection = document.getElementById("mentor-section");
  
          if (mentorSection) {
            const mentorSectionTop = mentorSection.offsetTop - 200;
            const shouldShowSidebar = scrollTop >= mentorSectionTop;
  
            if (shouldShowSidebar && !isSidebarMode) {
              activateSidebarMode();
            } else if (!shouldShowSidebar && isSidebarMode) {
              deactivateSidebarMode();
            }
          }
        }
  
        // Update active section highlighting
        updateActiveSection();
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      }
  
      // Sidebar functionality
      function activateSidebarMode() {
        // Only activate on desktop
        if (window.innerWidth <= 768) return;
  
        isSidebarMode = true;
        body.classList.add("sidebar-active");
        if (sidebar) sidebar.classList.add("active");
        closeMenu();
  
        // Smooth entrance animation
        setTimeout(() => {
          if (sidebar) sidebar.style.transform = "translateX(0)";
        }, 100);
      }
  
      function deactivateSidebarMode() {
        isSidebarMode = false;
        body.classList.remove("sidebar-active");
        if (sidebar) sidebar.classList.remove("active");
      }
  
      function handleResize() {
        // Disable sidebar on mobile
        if (window.innerWidth <= 768 && isSidebarMode) {
          deactivateSidebarMode();
        }
        updateActiveSection();
      }
  
      // Active section highlighting
      function updateActiveSection() {
        const scrollPosition = window.scrollY + 200;
  
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute("id");
  
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            // Update navbar links
            navLinks.forEach((link) => {
              link.classList.remove("active", "scroll-spy-active");
              if (link.getAttribute("href") === `#${sectionId}`) {
                link.classList.add("active", "scroll-spy-active");
              }
            });
  
            // Update sidebar links
            sidebarLinks.forEach((link) => {
              link.classList.remove("active", "scroll-spy-active");
              if (link.getAttribute("href") === `#${sectionId}`) {
                link.classList.add("active", "scroll-spy-active");
              }
            });
          }
        });
      }
    }
  
    /* ===============================
       4. ROBOT ASSISTANT
       =============================== */
    
    function initializeRobotAssistant() {
      const robotAssistantIcon = document.querySelector('.robot-assistant-icon');
      const robotAssistantDialog = document.getElementById('robot-assistant-dialog');
      const robotAssistantClose = document.getElementById('robot-assistant-close');
      const robotAssistantMessage = document.getElementById('robot-assistant-message');
      const robotOptions = document.querySelectorAll('.robot-option');
      
      // Check if elements exist
      if (!robotAssistantIcon || !robotAssistantDialog) return;
      
      // Messages for different sections
      const robotMessages = {
        'mentor-section': "Our mentor guides the team with years of experience and expertise. Would you like to learn about our other team members?",
        'leadership-section': "Our leadership team brings together experts in various fields of robotics. What else would you like to explore?",
        'core-section': "Our core team members are specialists who drive our projects forward. Can I help you navigate to other sections?",
        'junior-section': "Our junior members are the future of robotics innovation, bringing fresh ideas and enthusiasm. Where would you like to go next?",
      };
      
      // Toggle dialog visibility when clicking the robot icon
      robotAssistantIcon.addEventListener('click', () => {
        robotAssistantDialog.classList.add('active');
      });
      
      // Close dialog when clicking the close button
      if (robotAssistantClose) {
        robotAssistantClose.addEventListener('click', () => {
          robotAssistantDialog.classList.remove('active');
        });
      }
      
      // Handle navigation options
      robotOptions.forEach(option => {
        option.addEventListener('click', () => {
          const sectionId = option.getAttribute('data-section');
          
          // Scroll to the selected section
          const targetSection = document.getElementById(sectionId);
          if (targetSection) {
            targetSection.scrollIntoView({ 
              behavior: 'smooth' 
            });
          }
          
          // Update the robot's message
          if (robotAssistantMessage && robotMessages[sectionId]) {
            robotAssistantMessage.textContent = robotMessages[sectionId];
          }
          
          // Close dialog after navigation
          setTimeout(() => {
            robotAssistantDialog.classList.remove('active');
          }, 1000);
        });
      });
      
      // Auto-show robot assistant after 8 seconds
      setTimeout(() => {
        robotAssistantDialog.classList.add('active');
        
        // Auto-hide after 12 seconds if user doesn't interact
        setTimeout(() => {
          if (robotAssistantDialog.classList.contains('active')) {
            robotAssistantDialog.classList.remove('active');
          }
        }, 12000);
      }, 8000);
      
      // Close dialog when clicking outside
      document.addEventListener('click', function(event) {
        const isClickInside = robotAssistantDialog.contains(event.target) || 
                              robotAssistantIcon.contains(event.target);
        
        if (!isClickInside && robotAssistantDialog.classList.contains('active')) {
          robotAssistantDialog.classList.remove('active');
        }
      });
      
      // Prevent dialog from closing when clicking inside
      robotAssistantDialog.addEventListener('click', function(event) {
        event.stopPropagation();
      });
    }
  
    /* ===============================
       5. VISUAL EFFECTS
       =============================== */
    
    function initializeVisualEffects() {
      // Mouse trail effect
      initializeMouseTrail();
      
      // Glassy card effects
      initializeGlassyEffect();
      
      // Pulse hover effects
      initializePulseEffect();
    }
  
    function initializeMouseTrail() {
      document.addEventListener('mousemove', e => {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        document.body.appendChild(dot);
      
        setTimeout(() => {
          if (document.body.contains(dot)) {
            dot.remove();
          }
        }, 600);
      });
    }
  
    function initializeGlassyEffect() {
      // Glassy effect for team cards
      document.querySelectorAll('.team-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,255,255,0.15), transparent)`;
        });
      
        card.addEventListener('mouseleave', () => {
          card.style.background = '';
        });
      });
    }
  
    function initializePulseEffect() {
      // Add hover pulse effect to team cards
      document.querySelectorAll('.team-card').forEach(card => {
        card.classList.add('pulse-hover');
      });
    }
  
    /* ===============================
       6. SCROLL ANIMATIONS
       =============================== */
    
    function initializeScrollAnimations() {
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
      checkInView(); // Initial check on page load
    }
  
    /* ===============================
       7. ACCESSIBILITY FEATURES
       =============================== */
    
    function initializeAccessibility() {
      // Keyboard navigation
      document.addEventListener('keydown', function(event) {
        // ESC key closes robot assistant dialog
        const robotDialog = document.getElementById('robot-assistant-dialog');
        if (event.key === 'Escape' && robotDialog && robotDialog.classList.contains('active')) {
          robotDialog.classList.remove('active');
        }
      });
      
      // Mobile menu accessibility
      const mobileMenuButton = document.getElementById('hamburger-btn');
      if (mobileMenuButton) {
        mobileMenuButton.addEventListener('keydown', function(event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            mobileMenuButton.click();
          }
        });
      }
    }
  
    /* ===============================
       8. UTILITY FUNCTIONS
       =============================== */
    
    // Throttle function for performance optimization
    function throttle(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      }
    }
  
    // Debounce function for performance optimization
    function debounce(func, wait, immediate) {
      let timeout;
      return function() {
        const context = this, args = arguments;
        const later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }
  
    // Show notification function (for future use)
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
  
    // Export useful functions for external access
    window.TeamPageUtils = {
      showNotification,
      throttle,
      debounce
    };
    
  });