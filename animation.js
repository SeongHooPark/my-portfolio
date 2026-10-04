document.documentElement.classList.add('js-anim');

const expCards = document.querySelectorAll('.exp-card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

expCards.forEach((card) => observer.observe(card));
