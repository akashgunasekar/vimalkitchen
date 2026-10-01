/**
 * VIMAL Kitchen Equipment - Gallery & Lightbox Controller
 * Provides category filtering and accessible lightbox navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFiltering();
  initLightbox();
});

let galleryItems = [];
let currentImageIndex = 0;

function initGalleryFiltering() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => {
        b.classList.remove('bg-brand-red', 'text-white');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });
      btn.classList.add('bg-brand-red', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-image');
  const modalTitle = document.getElementById('lightbox-title');
  const modalCategory = document.getElementById('lightbox-category');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!modal || !modalImg) return;

  galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  function updateLightbox(index) {
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;
    currentImageIndex = index;

    const item = galleryItems[currentImageIndex];
    const img = item.querySelector('img');
    const title = item.getAttribute('data-title') || img.getAttribute('alt') || 'Commercial Installation';
    const category = item.getAttribute('data-category-label') || 'Kitchen Infrastructure';

    modalImg.src = img.src;
    modalImg.alt = title;
    if (modalTitle) modalTitle.textContent = title;
    if (modalCategory) modalCategory.textContent = category;
  }

  function openLightbox(index) {
    updateLightbox(index);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    updateLightbox(currentImageIndex - 1);
  });
  if (nextBtn) nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    updateLightbox(currentImageIndex + 1);
  });

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-backdrop')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(currentImageIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(currentImageIndex + 1);
  });
}
