const mobileMenu = document.querySelector('.mobile-menu');
const sidebar = document.querySelector('.sidebar');
const filters = document.querySelectorAll('.filter');
const rows = document.querySelectorAll('tbody tr');
const exportButton = document.querySelector('#export-button');
const mobileViewport = window.matchMedia('(max-width: 680px)');

if (sidebar && mobileMenu) {
  sidebar.id = sidebar.id || 'sidebar';
  mobileMenu.setAttribute('aria-controls', sidebar.id);
  mobileMenu.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-label', 'Abrir menu');

  const syncMenuVisibility = () => {
    const isOpen = mobileViewport.matches && sidebar.classList.contains('open');
    sidebar.inert = mobileViewport.matches && !isOpen;
    mobileMenu.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-label', isOpen ? 'Cerrar menu' : 'Abrir menu');

    if (!mobileViewport.matches) sidebar.classList.remove('open');
  };

  const closeMenu = (returnFocus = false) => {
    sidebar.classList.remove('open');
    sidebar.inert = mobileViewport.matches;
    mobileMenu.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-label', 'Abrir menu');
    if (returnFocus) mobileMenu.focus();
  };

  syncMenuVisibility();
  mobileViewport.addEventListener('change', syncMenuVisibility);
  mobileMenu.addEventListener('click', () => {
    const isOpening = !sidebar.classList.contains('open');
    sidebar.classList.toggle('open', isOpening);
    sidebar.inert = mobileViewport.matches && !isOpening;
    mobileMenu.setAttribute('aria-expanded', String(isOpening));
    mobileMenu.setAttribute('aria-label', isOpening ? 'Cerrar menu' : 'Abrir menu');

    if (isOpening) sidebar.querySelector('.side-nav a')?.focus();
  });

  sidebar.querySelectorAll('.side-nav a').forEach((link) => {
    const label = link.querySelector('span')?.textContent.trim();
    const count = link.querySelector('b')?.textContent.trim();
    if (label) link.setAttribute('aria-label', count ? `${label}, ${count}` : label);
    link.addEventListener('click', () => {
      if (mobileViewport.matches) closeMenu(true);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('open')) closeMenu(true);
  });
}

const filterStatus = document.createElement('span');
filterStatus.className = 'sr-only';
filterStatus.setAttribute('role', 'status');
filterStatus.setAttribute('aria-live', 'polite');
filters[0]?.parentElement?.insertAdjacentElement('afterend', filterStatus);

filters.forEach((button) => {
  button.setAttribute('aria-pressed', String(button.classList.contains('active')));
  button.addEventListener('click', () => {
  const filter = button.dataset.filter;
    filters.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    let visibleRows = 0;
    rows.forEach((row) => {
      const isHidden = filter !== 'all' && row.dataset.status !== filter;
      row.hidden = isHidden;
      row.classList.toggle('hidden', isHidden);
      if (!isHidden) visibleRows += 1;
    });
    filterStatus.textContent = `Se muestran ${visibleRows} de ${rows.length} reservas.`;
  });
});

document.querySelectorAll('th').forEach((header) => header.setAttribute('scope', 'col'));

const exportStatus = document.createElement('span');
exportStatus.className = 'sr-only';
exportStatus.setAttribute('role', 'status');
exportStatus.setAttribute('aria-live', 'polite');
exportButton?.insertAdjacentElement('afterend', exportStatus);

exportButton?.addEventListener('click', () => {
  exportStatus.textContent = 'Resumen listo.';
  window.setTimeout(() => { exportStatus.textContent = ''; }, 1800);
});
