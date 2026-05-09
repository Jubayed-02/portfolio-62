// Intersection Observer for scroll-based "fade-up" animations
  const fadeElements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        // optionally unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -30px 0px" });

  fadeElements.forEach(el => {
    observer.observe(el);
  });

  // additionally, manually trigger for any visible elements on load (just in case)
  window.addEventListener('load', () => {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('appear');
        observer.unobserve(el);
      }
    });
  });

  // Smooth anchor link behavior (already smooth via css, but add extra for all internal links)
  document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId !== '#') {
        e.preventDefault();
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          targetElem.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // update url hash without jump
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // initial check for any pre-visible elements after tiny delay (images, fonts)
  setTimeout(() => {
    fadeElements.forEach(el => {
      if (!el.classList.contains('appear')) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add('appear');
          observer.unobserve(el);
        }
      }
    });
  }, 200);