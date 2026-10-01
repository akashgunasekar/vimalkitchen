/**
 * VIMAL Kitchen Equipment - Reveal & Micro-interaction Animations
 * Uses IntersectionObserver with prefers-reduced-motion fallback
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initPipelineFlow();
});

function initScrollReveals() {
  // Check if reduced motion is requested
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    return;
  }

  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

function initPipelineFlow() {
  const pipelineSvg = document.querySelector('.pipeline-diagram svg');
  if (!pipelineSvg) return;

  // Pipeline flow observer to start pulsating dots when in view
  const flowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-flowing');
      }
    });
  }, { threshold: 0.2 });

  flowObserver.observe(pipelineSvg);
}
