// ---------------------------------------------------------------
// Reads ?id=<n> from the URL, looks up the product in js/products.js,
// and renders the detail page. Edit js/products.js to change content.
// ---------------------------------------------------------------

function notFoundTemplate() {
  return `
    <div class="pd-not-found">
      <h2>We couldn't find that bangle.</h2>
      <p>It may have been removed from the collection, or the link is out of date.</p>
      <a href="index.html#collection" class="btn btn-primary">Back to the collection</a>
    </div>
  `;
}

function productTemplate(product) {
  const waMessage = encodeURIComponent(`Hi Silk Élegance, I'd like to order the "${product.name}" bangle.`);
  return `
    <a href="index.html#collection" class="breadcrumb">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
      Back to the collection
    </a>

    <div class="product-detail">
      <div class="pd-media">
        <img src="${product.image}" alt="${product.name} — ${product.color} silk thread bangle">
      </div>
      <div class="pd-info">
        <span class="pd-collection">${product.collection} Collection</span>
        <h1 class="pd-name">${product.name}</h1>
        <div class="pd-price">${product.price}</div>

        <div class="pd-swatch-row">
          <span class="pd-swatch" style="background:${swatchGuess(product.color)}"></span>
          <span class="pd-swatch-label">Thread colour: <strong>${product.color}</strong></span>
        </div>

        <p class="pd-description">${product.description}</p>

        <div class="pd-actions">
          <a class="btn btn-primary" target="_blank" rel="noopener"
             href="https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}">Enquire on WhatsApp</a>
          <a class="btn btn-ghost" href="mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(product.name + ' enquiry')}">Email to order</a>
        </div>

        <ul class="pd-meta-list">
          <li><span>Material</span><span>Pure silk thread, brass base</span></li>
          <li><span>Made</span><span>To order, hand-wound</span></li>
          <li><span>Care</span><span>Keep away from water &amp; perfume</span></li>
        </ul>
      </div>
    </div>
  `;
}

// Rough colour-name-to-hex guess so the swatch dot has *something* to show
// even before you've added a real photo. Replace with an exact hex per
// product in products.js (add a "swatchHex" field) if you want precision.
function swatchGuess(name) {
  const map = {
    gold: '#d9a94e', pink: '#c9377d', teal: '#2fb3a3', green: '#3f9c6b',
    orange: '#d97a3a', white: '#ece6da', maroon: '#6e2233', blue: '#3a6ea5',
    beige: '#c9b691', purple: '#7a4fc2', red: '#a5313a', yellow: '#d9b23a',
    grey: '#8d8794', black: '#2a2730', lavender: '#a99bd6'
  };
  const key = Object.keys(map).find(k => name.toLowerCase().includes(k));
  return key ? map[key] : '#c9377d';
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const product = PRODUCTS.find(p => p.id === id);
  const mount = document.getElementById('product-detail');

  if (product) {
    document.title = `${product.name} — Silk Élegance`;
    mount.innerHTML = productTemplate(product);
  } else {
    document.title = 'Bangle not found — Silk Élegance';
    mount.innerHTML = notFoundTemplate();
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
