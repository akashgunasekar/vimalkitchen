/**
 * VIMAL Kitchen Equipment - Main JavaScript
 * Handles Header, Navigation, Active states, Mobile Menu, Back to top
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  setActiveNavLink();
  initBackToTop();
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
