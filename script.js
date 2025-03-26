AOS.init({
  once: true,
  offset: 100
});

// Mobile Menu Toggle with ARIA update
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // تحديث السمة aria-expanded
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !isExpanded);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', false);
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Header scroll effect with passive listener for performance
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }
}, { passive: true });
