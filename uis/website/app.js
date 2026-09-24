const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.menu-card');
const reservationForm = document.querySelector('#reservation-form');
const formMessage = document.querySelector('#form-message');

menuToggle?.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => {
  siteNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

tabs.forEach((tab) => tab.addEventListener('click', () => {
  const category = tab.dataset.category;
  tabs.forEach((item) => item.classList.toggle('active', item === tab));
  cards.forEach((card) => card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category));
}));

reservationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!reservationForm.checkValidity()) {
    formMessage.textContent = 'Revisa los datos para continuar.';
    reservationForm.reportValidity();
    return;
  }
  const name = new FormData(reservationForm).get('name');
  formMessage.textContent = `Gracias, ${name}. Te contactaremos para confirmar tu mesa.`;
  reservationForm.reset();
});
