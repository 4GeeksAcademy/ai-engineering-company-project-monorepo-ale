const mobileMenu = document.querySelector('.mobile-menu');
const sidebar = document.querySelector('.sidebar');
const filters = document.querySelectorAll('.filter');
const rows = document.querySelectorAll('tbody tr');
const exportButton = document.querySelector('#export-button');

mobileMenu?.addEventListener('click', () => sidebar.classList.toggle('open'));
filters.forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filters.forEach((item) => item.classList.toggle('active', item === button));
  rows.forEach((row) => row.classList.toggle('hidden', filter !== 'all' && row.dataset.status !== filter));
}));
exportButton?.addEventListener('click', () => {
  const original = exportButton.innerHTML;
  exportButton.innerHTML = 'Resumen listo <span>✓</span>';
  window.setTimeout(() => { exportButton.innerHTML = original; }, 1800);
});
