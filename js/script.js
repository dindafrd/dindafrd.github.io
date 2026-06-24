(function () {
  'use strict';

  /* =============================================
     TYPING EFFECT
     ============================================= */
  function initTyping() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const roles = [
      'Specialist Perencanaan Arsitektur TI',
      'Network Security Engineer',
      'IT Infrastructure Planner',
      'System Monitoring Expert'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
      const currentRole = roles[roleIndex];

      if (isPaused) {
        setTimeout(type, 1500);
        isPaused = false;
        return;
      }

      if (isDeleting) {
        el.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
      }

      setTimeout(type, speed);
    }

    setTimeout(type, 1000);
  }

  /* =============================================
     SCROLL REVEAL (IntersectionObserver)
     ============================================= */
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');

    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  /* =============================================
     NAVBAR SCROLL BEHAVIOR
     ============================================= */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        navbar.classList.remove('scrolled', 'hidden');
        return;
      }

      // Add scrolled class
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Hide on scroll down, show on scroll up
      if (currentScroll > lastScroll && currentScroll > 200) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }

      lastScroll = currentScroll;
    });
  }

  /* =============================================
     MOBILE NAV TOGGLE
     ============================================= */
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close nav on outside click
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        toggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  /* =============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     (fallback for older browsers)
     ============================================= */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* =============================================
     CONTACT FORM HANDLER
     ============================================= */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
      btn.disabled = true;

      var data = new FormData(form);

      fetch('/', { method: 'POST', body: data })
        .then(function () {
          btn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
          btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
          form.reset();
        })
        .catch(function () {
          btn.innerHTML = '<i class="fas fa-times"></i> Gagal!';
          btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        })
        .finally(function () {
          setTimeout(function () {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        });
    });
  }

  /* =============================================
     INIT
     ============================================= */
  document.addEventListener('DOMContentLoaded', function () {
    initTyping();
    initReveal();
    initNavbar();
    initMobileNav();
    initSmoothScroll();
    initContactForm();
  });
})();
