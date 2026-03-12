// nav bar
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// mobile adjustments
const toggle = document.getElementById('navToggle');
const links  = document.querySelector('.nav__links');
toggle.addEventListener('click', () => {
  links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', links.classList.contains('open'));
});

// declose mobile menu
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => links.classList.remove('open'));
});

// scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children slightly
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.12 });

// cards and blocks
document.querySelectorAll(
  '.about__card, .project-card, .about__text p, .section__heading, .section__label, .contact__grid > div'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 4) * 80;
  observer.observe(el);
});

// active nav links
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeObserver.observe(s));
