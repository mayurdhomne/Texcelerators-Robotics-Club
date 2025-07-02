// ===== TEXCELERATORS ROBOTICS CLUB WEBSITE =====
// Enhanced JavaScript with all functionality from both files merged

document.addEventListener('DOMContentLoaded', function() {
  // ===== INITIALIZATION =====
  initializeNavigation();
  initializeAnimations();
});

// ===== NAVIGATION SYSTEM =====
function initializeNavigation() {
  // DOM Elements
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
  
  // Setup event listeners
  setupNavigationEvents();
  updateActiveSection();
  
  function setupNavigationEvents() {
    // Hamburger menu toggle
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', toggleMenu);
    }
    
    // Navigation link clicks
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });
    
    sidebarLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });
    
    // Scroll events for sidebar activation and section highlighting
    window.addEventListener('scroll', throttle(handleScroll, 16)); // 60fps throttling
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (isMenuOpen && header && !header.contains(e.target)) {
        closeMenu();
      }
    });
  }
  
  // ===== MENU FUNCTIONALITY =====
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
    
    // Animate menu items with stagger effect
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
  
  // ===== NAVIGATION CLICK HANDLER =====
  function handleNavClick(e) {
    const href = e.currentTarget.getAttribute('href');
    
    // Check if it's an external link (contains .html)
    if (href.includes('.html')) {
      // Let the browser handle the navigation normally
      closeMenu();
      return;
    }
    
    // Handle internal section navigation
    e.preventDefault();
    const targetId = href.substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - (isSidebarMode ? 0 : 120);
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      closeMenu();
    }
  }
  
  // ===== SCROLL HANDLER =====
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Sidebar activation logic (desktop only)
    if (window.innerWidth > 768) {
      const robotSection = document.getElementById('robosoccer');
      
      if (robotSection) {
        const robotTop = robotSection.offsetTop - 200;
        const shouldShowSidebar = scrollTop >= robotTop;
        
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
  
  // ===== SIDEBAR FUNCTIONALITY =====
  function activateSidebarMode() {
    // Only activate on desktop
    if (window.innerWidth <= 768) return;
    
    isSidebarMode = true;
    body.classList.add('sidebar-active');
    if (sidebar) sidebar.classList.add('active');
    closeMenu();
    
    // Smooth entrance animation
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
    // Disable sidebar on mobile
    if (window.innerWidth <= 768 && isSidebarMode) {
      deactivateSidebarMode();
    }
    updateActiveSection();
  }
  
  // ===== ACTIVE SECTION HIGHLIGHTING =====
  function updateActiveSection() {
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Update navbar links
        navLinks.forEach(link => {
          link.classList.remove('active', 'scroll-spy-active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active', 'scroll-spy-active');
          }
        });
        
        // Update sidebar links
        sidebarLinks.forEach(link => {
          link.classList.remove('active', 'scroll-spy-active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active', 'scroll-spy-active');
          }
        });
      }
    });
  }
  
  // ===== UTILITY FUNCTIONS =====
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
}

// ===== ANIMATIONS =====
function initializeAnimations() {
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
  
  // Add staggered animation delays for better visual effect
  animatedElements.forEach((element, index) => {
    element.style.animationDelay = (index * 0.1) + 's';
  });
}

// Robot Details Toggle Function (Keep your existing function)
function toggleRobotDetails(robotId) {
  const details = document.getElementById(robotId + '-details');
  
  if (details) {
    // Close all other expanded details first
    const allDetails = document.querySelectorAll('.robot-details');
    allDetails.forEach(detail => {
      if (detail.id !== robotId + '-details') {
        detail.classList.remove('expanded');
      }
    });
    
    // Toggle the clicked one
    details.classList.toggle('expanded');
    
    // Add a small delay to ensure smooth animation
    if (details.classList.contains('expanded')) {
      setTimeout(() => {
        details.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
      }, 300);
    }
  }
}
// ===== BEHIND THE SCENES FUNCTIONALITY =====
function initializeBehindScenes() {
  // Initialize filter functionality
  initializeFilters();
  
  // Initialize story moment interactions
  initializeStoryMoments();
}

function initializeFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const storyMoments = document.querySelectorAll('.story-moment');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter story moments
      storyMoments.forEach(moment => {
        const category = moment.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          moment.classList.remove('hidden');
          // Trigger re-animation
          setTimeout(() => {
            moment.classList.add('visible');
          }, 100);
        } else {
          moment.classList.add('hidden');
          moment.classList.remove('visible');
        }
      });
    });
  });
}

function initializeStoryMoments() {
  const storyMoments = document.querySelectorAll('.story-moment');
  
  storyMoments.forEach(moment => {
    // Add click interaction for mobile
    moment.addEventListener('click', (e) => {
      // Toggle overlay visibility on mobile
      if (window.innerWidth <= 768) {
        const overlay = moment.querySelector('.story-overlay');
        overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
      }
    });
    
    // Add keyboard accessibility
    moment.setAttribute('tabindex', '0');
    moment.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        moment.click();
      }
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add this to your existing initialization
  initializeBehindScenes();
});

// ===== TIMELINE FUNCTIONALITY =====
function initializeTimeline() {
  // Initialize timeline scroll animations
  initializeTimelineAnimations();
  
  // Add enhanced timeline interactions
  addTimelineInteractions();
}

function initializeTimelineAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // Create intersection observer for timeline items
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add staggered animation delay based on item index
        const index = Array.from(timelineItems).indexOf(entry.target);
        const delay = index * 200; // 200ms delay between each item
        
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        
        // Only animate once
        timelineObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2, // Trigger when 20% of item is visible
    rootMargin: '0px 0px -50px 0px' // Start animation slightly before item is fully visible
  });
  
  // Observe all timeline items
  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });
}

function addTimelineInteractions() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    // Add click functionality for mobile
    item.addEventListener('click', function() {
      // Smooth scroll to center the clicked item
      this.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      
      // Add temporary highlight effect
      this.style.transform = 'scale(1.02)';
      setTimeout(() => {
        this.style.transform = '';
      }, 300);
    });
    
    // Add keyboard accessibility
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
    
    // Enhanced hover effects for desktop
    if (window.innerWidth > 768) {
      item.addEventListener('mouseenter', function() {
        // Highlight connected timeline line section
        const indicator = this.querySelector('::after');
        this.style.zIndex = '10';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.zIndex = '';
      });
    }
  });
}

// Timeline navigation function (optional enhancement)
function navigateTimeline(direction) {
  const timelineItems = document.querySelectorAll('.timeline-item.visible');
  const currentScroll = window.pageYOffset;
  let targetItem = null;
  
  if (direction === 'next') {
    // Find next item below current scroll position
    for (let item of timelineItems) {
      if (item.offsetTop > currentScroll + 100) {
        targetItem = item;
        break;
      }
    }
  } else if (direction === 'prev') {
    // Find previous item above current scroll position
    for (let i = timelineItems.length - 1; i >= 0; i--) {
      if (timelineItems[i].offsetTop < currentScroll - 100) {
        targetItem = timelineItems[i];
        break;
      }
    }
  }
  
  if (targetItem) {
    targetItem.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}

// Initialize timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add this to your existing initialization
  initializeTimeline();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
  // Reinitialize interactions for responsive changes
  if (window.innerWidth <= 768) {
    // Mobile-specific adjustments
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.style.transform = '';
      item.style.zIndex = '';
    });
  }
});

// ===== BACK TO TOP BUTTON FUNCTIONALITY =====
function initializeBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  // Show/hide button based on scroll position
  function toggleBackToTopButton() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
  
  // Smooth scroll to top when clicked
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Event listeners
  window.addEventListener('scroll', toggleBackToTopButton);
  backToTopBtn.addEventListener('click', scrollToTop);
  
  // Optional: Add keyboard support
  backToTopBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add this to your existing initialization
  initializeBackToTop();
});