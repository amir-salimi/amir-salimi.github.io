 // Profile Website Interactive Features

 document.addEventListener('DOMContentLoaded', function() {
     // Initialize animations
     initializeAnimations();

     // Initialize contact modal
     initializeContactModal();

     // Initialize scroll effects
     initializeScrollEffects();

     // Initialize typing animation
     initializeTypingAnimation();
 });

 // Animation initialization
 function initializeAnimations() {
     // Add entrance animations to elements
     const elementsToAnimate = document.querySelectorAll('.profile-card, .info-section');

     const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 entry.target.style.opacity = '1';
                 entry.target.style.transform = 'translateY(0)';
             }
         });
     }, {
         threshold: 0.1
     });

     elementsToAnimate.forEach(element => {
         observer.observe(element);
     });

     // Add hover effects to skill tags
     const skillTags = document.querySelectorAll('.skill-tag');
     skillTags.forEach(tag => {
         tag.addEventListener('mouseenter', function() {
             this.style.transform = 'translateY(-2px) scale(1.05)';
         });

         tag.addEventListener('mouseleave', function() {
             this.style.transform = 'translateY(0) scale(1)';
         });
     });
 }

 // Contact modal functionality
 function initializeContactModal() {
     const contactOverlay = document.getElementById('contactOverlay');

     // Close modal when clicking outside
     contactOverlay.addEventListener('click', function(e) {
         if (e.target === contactOverlay) {
             closeContact();
         }
     });

     // Close modal with escape key
     document.addEventListener('keydown', function(e) {
         if (e.key === 'Escape' && contactOverlay.classList.contains('active')) {
             closeContact();
         }
     });
 }

 // Contact modal functions
 function scrollToContact() {
     const contactOverlay = document.getElementById('contactOverlay');
     contactOverlay.classList.add('active');
     document.body.style.overflow = 'hidden';

     // Add animation delay for modal content
     setTimeout(() => {
         const modal = document.querySelector('.contact-modal');
         modal.style.transform = 'scale(1) rotate(0deg)';
     }, 100);
 }

 function closeContact() {
     const contactOverlay = document.getElementById('contactOverlay');
     contactOverlay.classList.remove('active');
     document.body.style.overflow = 'auto';
 }

 // Scroll effects
 function initializeScrollEffects() {
     let ticking = false;

     function updateScrollEffects() {
         const scrolled = window.pageYOffset;
         const rate = scrolled * -0.5;

         // Parallax effect for background
         const backgroundOverlay = document.querySelector('.background-overlay');
         if (backgroundOverlay) {
             backgroundOverlay.style.transform = `translate3d(0, ${rate}px, 0)`;
         }

         ticking = false;
     }

     function requestTick() {
         if (!ticking) {
             requestAnimationFrame(updateScrollEffects);
             ticking = true;
         }
     }

     window.addEventListener('scroll', requestTick);
 }

 // Typing animation for profile title
 function initializeTypingAnimation() {
     const profileTitle = document.querySelector('.profile-title');
     if (!profileTitle) return;

     const originalText = profileTitle.textContent;
     const typingSpeed = 100;
     const deletingSpeed = 50;
     const pauseTime = 2000;

     let currentText = '';
     let isDeleting = false;
     let charIndex = 0;

     function typeWriter() {
         if (isDeleting) {
             currentText = originalText.substring(0, charIndex - 1);
             charIndex--;
         } else {
             currentText = originalText.substring(0, charIndex + 1);
             charIndex++;
         }

         profileTitle.textContent = currentText;

         let speed = isDeleting ? deletingSpeed : typingSpeed;

         if (!isDeleting && charIndex === originalText.length) {
             speed = pauseTime;
             isDeleting = true;
         } else if (isDeleting && charIndex === 0) {
             isDeleting = false;
             speed = typingSpeed;
         }

         setTimeout(typeWriter, speed);
     }

     // Start typing animation after a delay
     setTimeout(() => {
         profileTitle.textContent = '';
         typeWriter();
     }, 1500);
 }

 // Social link analytics (optional)
 function trackSocialClick(platform) {
     // You can add analytics tracking here
     console.log(`Clicked on ${platform} link`);

     // Example: Google Analytics event tracking
     // gtag('event', 'social_click', {
     //     'platform': platform,
     //     'page_title': document.title
     // });
 }

 // Add click tracking to social links
 document.addEventListener('DOMContentLoaded', function() {
     const socialLinks = document.querySelectorAll('.social-link');

     socialLinks.forEach(link => {
         link.addEventListener('click', function() {
             const platform = this.classList.contains('telegram') ? 'telegram' :
                 this.classList.contains('instagram') ? 'instagram' :
                 this.classList.contains('github') ? 'github' : 'unknown';

             trackSocialClick(platform);
         });
     });
 });

 // Smooth scrolling for internal links
 function smoothScroll(target, duration = 800) {
     const targetElement = document.querySelector(target);
     if (!targetElement) return;

     const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
     const startPosition = window.pageYOffset;
     const distance = targetPosition - startPosition;
     let startTime = null;

     function animation(currentTime) {
         if (startTime === null) startTime = currentTime;
         const timeElapsed = currentTime - startTime;
         const run = ease(timeElapsed, startPosition, distance, duration);
         window.scrollTo(0, run);
         if (timeElapsed < duration) requestAnimationFrame(animation);
     }

     function ease(t, b, c, d) {
         t /= d / 2;
         if (t < 1) return c / 2 * t * t + b;
         t--;
         return -c / 2 * (t * (t - 2) - 1) + b;
     }

     requestAnimationFrame(animation);
 }

 // Dynamic background particles (optional enhancement)
 function createParticles() {
     const canvas = document.createElement('canvas');
     canvas.id = 'particles';
     canvas.style.position = 'fixed';
     canvas.style.top = '0';
     canvas.style.left = '0';
     canvas.style.width = '100%';
     canvas.style.height = '100%';
     canvas.style.pointerEvents = 'none';
     canvas.style.zIndex = '-1';
     canvas.style.opacity = '0.3';

     document.body.appendChild(canvas);

     const ctx = canvas.getContext('2d');
     let particles = [];

     function resizeCanvas() {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
     }

     function Particle() {
         this.x = Math.random() * canvas.width;
         this.y = Math.random() * canvas.height;
         this.vx = (Math.random() - 0.5) * 0.5;
         this.vy = (Math.random() - 0.5) * 0.5;
         this.radius = Math.random() * 2;
         this.alpha = Math.random() * 0.5 + 0.2;
     }

     Particle.prototype.update = function() {
         this.x += this.vx;
         this.y += this.vy;

         if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
         if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
     };

     Particle.prototype.draw = function() {
         ctx.globalAlpha = this.alpha;
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
         ctx.fillStyle = '#3b82f6';
         ctx.fill();
     };

     function animate() {
         ctx.clearRect(0, 0, canvas.width, canvas.height);

         particles.forEach(particle => {
             particle.update();
             particle.draw();
         });

         requestAnimationFrame(animate);
     }

     function init() {
         resizeCanvas();
         particles = [];
         for (let i = 0; i < 50; i++) {
             particles.push(new Particle());
         }
         animate();
     }

     window.addEventListener('resize', resizeCanvas);
     init();
 }

 // Initialize particles on load (uncomment to enable)
 // window.addEventListener('load', createParticles);

 // Performance optimization: Debounce function
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