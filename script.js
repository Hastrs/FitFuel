
    // Initialize AOS animations
    AOS.init({
      once: true,
      offset: 100
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        navLinks.classList.remove('active');
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      }
    });

// service-worker.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js');

if (workbox) {
  console.log("Workbox is loaded");

  workbox.routing.registerRoute(
    ({request}) =>
      request.destination === 'image' ||
      request.destination === 'script' ||
      request.destination === 'style',
    new workbox.strategies.CacheFirst({
      cacheName: 'fitfuel-static-assets',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 30 * 24 * 60 * 60, 
          purgeOnQuotaError: true, 
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({request}) => request.destination === 'document',
    new workbox.strategies.NetworkFirst({
      cacheName: 'fitfuel-html-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 30 * 24 * 60 * 60, 
          purgeOnQuotaError: true,
        }),
      ],
    })
  );
  
} else {
  console.log("Workbox didn't load");
}

