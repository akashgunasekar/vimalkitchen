/**
 * VIMAL Kitchen Equipment - Main JavaScript
 * Handles Header, Navigation, Active states, Mobile Menu, Back to top
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  setActiveNavLink();
  initBackToTop();
  initHeroSlider();
  initLucideIcons();
});

/**
 * Sticky Header behavior on scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav-panel');
  const closeBtn = document.getElementById('mobile-close-btn');

  if (!menuBtn || !mobileNav) return;

  const openMenu = () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close when clicking mobile links
  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * Mark active navigation link based on current pathname
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Check exact match or root match
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Back to Top Floating Button
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Initialize Lucide Icons if available
 */
function initLucideIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

/**
 * Auto-Sliding Hero Carousel
 */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const tabs = document.querySelectorAll('.hero-tab-btn');
  const progressBar = document.getElementById('hero-timer-progress');
  const prevBtn = document.getElementById('hero-prev-btn');
  const nextBtn = document.getElementById('hero-next-btn');
  const sliderContainer = document.querySelector('.hero-slider-wrapper');

  if (!slides.length) return;

  let currentIndex = 0;
  let timer = null;
  let progressTimer = null;
  const slideDuration = 5500; // 5.5 seconds per slide
  let isPaused = false;
  let progress = 0;
  const stepTime = 50; // update progress every 50ms

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    // Toggle active slide class
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Toggle active tab button
    tabs.forEach((tab, i) => {
      if (i === currentIndex) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    resetTimer();
    initLucideIcons();
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function resetTimer() {
    clearInterval(progressTimer);
    clearTimeout(timer);
    progress = 0;
    if (progressBar) progressBar.style.width = '0%';

    if (isPaused) return;

    progressTimer = setInterval(() => {
      if (!isPaused) {
        progress += (stepTime / slideDuration) * 100;
        if (progressBar) progressBar.style.width = Math.min(progress, 100) + '%';
        if (progress >= 100) {
          clearInterval(progressTimer);
          nextSlide();
        }
      }
    }, stepTime);
  }

  // Next / Prev Button events
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
    });
  }

  // Tab buttons click
  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(idx);
    });
  });

  // Pause on hover
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
      isPaused = true;
    });
    sliderContainer.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance < 0) {
          nextSlide(); // Swiped left -> next
        } else {
          prevSlide(); // Swiped right -> prev
        }
      }
    }
  }

  // Keyboard navigation when visible
  document.addEventListener('keydown', (e) => {
    // Only if within viewport
    const rect = sliderContainer?.getBoundingClientRect();
    if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    }
  });

  // Start the slider on initial slide
  showSlide(0);
}

