// ---------------------------------------------------------------
// Renders the 25 product cards on the homepage from js/products.js
// Clicking anywhere on a card opens product.html?id=<id>
// ---------------------------------------------------------------

function cardTemplate(product) {
  return `
    <a class="card" href="product.html?id=${product.id}" data-collection="${product.collection}">
      <div class="card-inner">
        <div class="card-media">
          <img src="${product.image}" alt="${product.name} — ${product.color} silk thread bangle" loading="lazy">
        </div>
        <div class="card-body">
          <span class="card-collection">${product.collection}</span>
          <h3 class="card-name">${product.name}</h3>
          <p class="card-color">${product.color}</p>
          <div class="card-footer">
            <span class="card-price">${product.price}</span>
            <span class="card-view">View
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </a>
  `;
}

function renderGrid(filter) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  const list = filter && filter !== 'All'
    ? PRODUCTS.filter(p => p.collection === filter)
    : PRODUCTS;
  grid.innerHTML = list.map(cardTemplate).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderGrid('All');

  const filterRow = document.getElementById('filter-row');
  if (filterRow) {
    filterRow.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      filterRow.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      renderGrid(btn.dataset.filter);
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact section links, built from js/config.js so there's one place to edit them.
  const formLink = document.getElementById('custom-form-link');
  if (formLink) formLink.href = GOOGLE_FORM_URL;

  const waLink = document.getElementById('whatsapp-link');
  if (waLink) {
    const msg = encodeURIComponent("Hi Silk Élegance, I'd like to ask about a custom bangle.");
    waLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  }

  const emailLink = document.getElementById('email-link');
  if (emailLink) emailLink.href = `mailto:${CONTACT_EMAIL}`;
});
