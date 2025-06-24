// Team Page Enhanced JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // ===============================
  // Loader Animation
  // ===============================

  document.addEventListener('mousemove', e => {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    document.body.appendChild(dot);
  
    setTimeout(() => {
      dot.remove();
    }, 600);
  });


  
  // WAS ADDED LATEER SO YEAH ITS THAT GLASSY EFFECT < OR THAT MOUSE LIGHT SO IT STARTS FROM HERE 
  document.querySelectorAll('.team-card, .junior-card, .leadership-card').forEach(card => {
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
  //  AND IT ENDS HERE 

  document.addEventListener('DOMContentLoaded', function () {
    // Add hover pulse effect to team cards
    document.querySelectorAll('.team-card, .junior-card, .leadership-card').forEach(card => {
      card.classList.add('pulse-hover');
    });
  });
  



  
  const loader = document.getElementById('loader');
  
  // Hide loader after 4 seconds with a smooth fade-out
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 2000);
  
  // ===============================
  // Robot Assistant Feature
  // ===============================
  
  const robotAssistantIcon = document.querySelector('.robot-assistant-icon');
  const robotAssistantDialog = document.getElementById('robot-assistant-dialog');
  const robotAssistantClose = document.getElementById('robot-assistant-close');
  const robotAssistantMessage = document.getElementById('robot-assistant-message');
  const robotOptions = document.querySelectorAll('.robot-option');
  
  // Messages for different sections
  const robotMessages = {
    'leadership-section': "Our leadership team brings together experts in mechanical design, software engineering, and project management. Would you like to learn about another group?",
    'core-section': "Our core team members are specialists in their fields, from UX design to electronics engineering. What else would you like to know about?",
    'junior-section': "Our junior members are the future of robotics innovation, bringing fresh ideas and enthusiasm to the team. Can I help you explore other sections?",
    'join-section': "We're always looking for passionate individuals to join our team. Do you have specific skills in robotics, programming, or design? Let me navigate you to other sections!"
  };
  
  // Toggle dialog visibility when clicking the robot icon
  robotAssistantIcon.addEventListener('click', () => {
    robotAssistantDialog.classList.add('active');
  });
  
  // Close dialog when clicking the close button
  robotAssistantClose.addEventListener('click', () => {
    robotAssistantDialog.classList.remove('active');
  });
  
  // Handle navigation options
  robotOptions.forEach(option => {
    option.addEventListener('click', () => {
      const sectionId = option.getAttribute('data-section');
      
      // Scroll to the selected section
      document.getElementById(sectionId).scrollIntoView({ 
        behavior: 'smooth' 
      });
      
      // Update the robot's message
      robotAssistantMessage.textContent = robotMessages[sectionId];
      
      // Add a brief transition delay to make it feel more natural
      setTimeout(() => {
        robotAssistantDialog.classList.remove('active');
      }, 1000);
    });
  });
  
  // Automatically show robot assistant after 8 seconds
  setTimeout(() => {
    robotAssistantDialog.classList.add('active');
    
    // Auto-hide after 12 seconds if user doesn't interact
    setTimeout(() => {
      if (robotAssistantDialog.classList.contains('active')) {
        robotAssistantDialog.classList.remove('active');
      }
    }, 12000);
  }, 8000);
  
  // ===============================
  // Mobile Navigation Menu Toggle
  // ===============================
  
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
  
  // ===============================
  // Animate on Scroll
  // ===============================
  
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
  
  // ===============================
  // Keyboard Navigation for Accessibility
  // ===============================
  
  document.addEventListener('keydown', function(event) {
    // ESC key closes robot assistant dialog
    if (event.key === 'Escape' && robotAssistantDialog.classList.contains('active')) {
      robotAssistantDialog.classList.remove('active');
    }
  });
  
  // ===============================
  // Touch Outside to Close Dialog
  // ===============================
  
  document.addEventListener('click', function(event) {
    const isClickInside = robotAssistantDialog.contains(event.target) || 
                          robotAssistantIcon.contains(event.target);
    
    if (!isClickInside && robotAssistantDialog.classList.contains('active')) {
      robotAssistantDialog.classList.remove('active');
    }
  });
  
  // ===============================
  // Prevent Dialog from Closing When Clicking Inside
  // ===============================
  
  robotAssistantDialog.addEventListener('click', function(event) {
    event.stopPropagation();
  });
});

/*
  HOW TO CUSTOMIZE THE ROBOT ASSISTANT MESSAGES:
  
  1. Find the robotMessages object near the top of this file
  2. Modify the messages for each section as needed
  3. The keys correspond to the section IDs in the HTML
  
  To add a new section:
  1. Add a new key-value pair to the robotMessages object
  2. Create a new option button in the HTML with data-section attribute matching your new section ID
  
  Example:
  robotMessages['new-section-id'] = "Your custom message for this section";
*/
// Update for robot assistant to include Alumni section
document.addEventListener('DOMContentLoaded', function() {
  // Get existing robot messages object (if it exists)
  const existingRobotMessages = window.robotMessages || {};
  
  // Add the alumni section message
  const updatedRobotMessages = {
    ...existingRobotMessages,
    'alumni-section': "Our alumni have gone on to do amazing things in robotics and tech. They continue to inspire our current members with their achievements. Would you like to learn about another section of our team?"
  };
  
  // Update the global robot messages
  window.robotMessages = updatedRobotMessages;
  
  // Check if we need to add the Alumni option button to the robot assistant
  const robotAssistantOptions = document.querySelector('.robot-assistant-options');
  const existingAlumniOption = document.querySelector('.robot-option[data-section="alumni-section"]');
  
  if (robotAssistantOptions && !existingAlumniOption) {
    // Create new option for Alumni section
    const alumniOption = document.createElement('button');
    alumniOption.className = 'robot-option';
    alumniOption.setAttribute('data-section', 'alumni-section');
    alumniOption.textContent = 'Alumni Network';
    
    // Add click event listener
    alumniOption.addEventListener('click', () => {
      const sectionId = 'alumni-section';
      
      // Scroll to the selected section
      document.getElementById(sectionId).scrollIntoView({ 
        behavior: 'smooth' 
      });
      
      // Update the robot's message
      const robotAssistantMessage = document.getElementById('robot-assistant-message');
      if (robotAssistantMessage) {
        robotAssistantMessage.textContent = updatedRobotMessages[sectionId];
      }
      
      // Add a brief transition delay to make it feel more natural
      setTimeout(() => {
        const robotAssistantDialog = document.getElementById('robot-assistant-dialog');
        if (robotAssistantDialog) {
          robotAssistantDialog.classList.remove('active');
        }
      }, 1000);
    });
    
    // Add the new option to the robot assistant
    robotAssistantOptions.appendChild(alumniOption);
  }
  
  // Add animation triggers for the alumni section
  const animateAlumniElements = document.querySelectorAll('#alumni-section .animate-on-scroll');
  
  function checkAlumniInView() {
    const windowHeight = window.innerHeight;
    const windowTop = window.scrollY;
    const windowBottom = windowTop + windowHeight;
    
    animateAlumniElements.forEach(element => {
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const elementBottom = elementTop + elementHeight;
      
      // Check if element is in view
      if (elementBottom > windowTop && elementTop < windowBottom) {
        element.classList.add('visible');
      }
    });
  }
  
  // Add scroll event listener if we have alumni elements
  if (animateAlumniElements.length > 0) {
    window.addEventListener('scroll', checkAlumniInView);
    // Initial check
    checkAlumniInView();
  }
});
// later added Code 
// Enhanced Team Page Functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the back to top button
  initBackToTop();
  
  // Initialize team filtering
  initTeamFiltering();
  
  // Initialize skill tag filtering
  // initSkillTagFiltering();
});

// Back to Top Button Functionality
function initBackToTop() {
  // Create back to top button
  const backToTopBtn = document.createElement('div');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTopBtn);
  
  // Show/hide back to top button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  // Smooth scroll to top when clicked
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Team Filtering Functionality
function initTeamFiltering() {
  // Get all sections that contain team members
  const teamSections = [
    document.getElementById('leadership-section'),
    document.getElementById('core-section'),
    document.getElementById('junior-section')
  ];
  
  // Only proceed if we found at least one section
  if (!teamSections.every(section => section)) return;
  
  // Create filter section and add to page before the first team section
  const filterSection = document.createElement('div');
  filterSection.className = 'container';
  filterSection.innerHTML = `
    <div class="team-filter">
      <button class="filter-button active" data-filter="all">All Members</button>
      <button class="filter-button" data-filter="leadership">Leadership</button>
      <button class="filter-button" data-filter="core">Core Team</button>
      <button class="filter-button" data-filter="junior">Junior Members</button>
    </div>
  `;
  
  teamSections[0].parentNode.insertBefore(filterSection, teamSections[0]);
  
  // Set up click event listeners for filter buttons
  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Show/hide sections based on filter
      teamSections.forEach(section => {
        if (filter === 'all') {
          section.style.display = 'block';
        } else {
          // Check if this section ID contains the filter string
          if (section.id.includes(filter)) {
            section.style.display = 'block';
          } else {
            section.style.display = 'none';
          }
        }
      });
      
      // Scroll to the active section
      if (filter !== 'all') {
        const activeSection = document.getElementById(filter + '-section');
        if (activeSection) {
          setTimeout(() => {
            activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    });
  });
}

// // Skill Tag Filtering
// function initSkillTagFiltering() {
//   // Add data-skill attributes to all tech tags
//   const techTags = document.querySelectorAll('.tech-tag');
//   techTags.forEach(tag => {
//     const skill = tag.textContent.trim().toLowerCase().replace(/\s+/g, '-');
//     tag.setAttribute('data-skill', skill);
    
//     // Make tags clickable for filtering
//     tag.addEventListener('click', () => {
//       filterMembersBySkill(skill);
//     });
//   });
// }

// // Filter team members by skill
// function filterMembersBySkill(skill) {
//   const teamCards = document.querySelectorAll('.leadership-card, .team-card, .junior-card');
//   let foundAny = false;
  
//   // Reset all cards first
//   teamCards.forEach(card => {
//     card.classList.remove('hidden-member');
//     card.classList.remove('filtered-in');
//   });
  
//   // Filter cards that don't have the skill
//   teamCards.forEach(card => {
//     const cardSkills = card.querySelectorAll('.tech-tag');
//     let hasSkill = false;
    
//     cardSkills.forEach(tag => {
//       if (tag.getAttribute('data-skill') === skill) {
//         hasSkill = true;
//       }
//     });
    
//     if (!hasSkill && cardSkills.length > 0) {
//       card.classList.add('hidden-member');
//     } else if (hasSkill) {
//       card.classList.add('filtered-in');
//       foundAny = true;
//     }
//   });
  
//   // Show a message if no members with that skill were found
//   const existingMessage = document.getElementById('no-results-message');
//   if (existingMessage) {
//     existingMessage.remove();
//   }
  
//   if (!foundAny) {
//     const message = document.createElement('div');
//     message.id = 'no-results-message';
//     message.className = 'container';
//     message.innerHTML = `
//       <div style="text-align: center; padding: 2rem; color: var(--muted-foreground);">
//         <p>No team members found with the "${skill.replace(/-/g, ' ')}" skill.</p>
//         <button class="filter-button" onclick="resetSkillFilter()">Show All Members</button>
//       </div>
//     `;
    
//     const firstSection = document.querySelector('.team-leadership, .team-core, .team-junior');
//     if (firstSection) {
//       firstSection.appendChild(message);
//     }
//   }
// }

// // Reset skill filtering
// function resetSkillFilter() {
//   const teamCards = document.querySelectorAll('.leadership-card, .team-card, .junior-card');
//   teamCards.forEach(card => {
//     card.classList.remove('hidden-member');
//     card.classList.remove('filtered-in');
//   });
  
//   const message = document.getElementById('no-results-message');
//   if (message) {
//     message.remove();
//   }
// }

