 // Main JavaScript for Texcelerators Robotics Club Website

 document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.contains('open');
        
        if (isOpen) {
          mobileMenu.classList.remove('open');
          mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
          mobileMenu.classList.add('open');
          mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>';
        }
      });

      
      
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('open');
          mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        });
      });
    }
    
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
    
    // Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      });
    }
  });

  // Robot Details Toggle Function
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

  // Add staggered animation delays for better visual effect
  document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach((element, index) => {
      element.style.animationDelay = (index * 0.1) + 's';
    });

    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
    
      el.addEventListener('mouseleave', () => {
        el.style.transform = `translate(0px, 0px)`;
      });
    });
      

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const card = btn.closest('.flip-card');
          card.classList.add('flipped');
        });
      });
    
      document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const card = btn.closest('.flip-card');
          card.classList.remove('flipped');
        });
      });
    });
    
  });