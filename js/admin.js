// ---------------------------------------------------------------
// Admin tool for managing products without hand-editing products.js.
//
// How it works:
// - On load, it starts from the PRODUCTS array (from js/products.js).
// - Any add/edit/delete you make is kept in this browser's localStorage
//   as a *draft*, so a refresh won't lose your work.
// - Nothing changes on your live site until you click "Download
//   products.js" and replace the file in your project's js/ folder.
// ---------------------------------------------------------------

const DRAFT_KEY = 'silkelegance_admin_draft_v1';
let draftProducts = [];
let editingId = null;

function loadDraft() {
  const saved = localStorage.getItem(DRAFT_KEY);
  if (saved) {
    try {
      draftProducts = JSON.parse(saved);
      return;
    } catch (e) { /* fall through to default */ }
  }
  draftProducts = JSON.parse(JSON.stringify(PRODUCTS));
}

function saveDraft() {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draftProducts));
}

function nextId() {
  return draftProducts.length ? Math.max(...draftProducts.map(p => p.id)) + 1 : 1;
}

function slugify(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ---------- table rendering ----------
function renderTable() {
  const wrap = document.getElementById('admin-table');
  document.getElementById('product-count').textContent = draftProducts.length;

  if (!draftProducts.length) {
    wrap.innerHTML = '<p class="admin-hint">No products yet. Add your first one using the form.</p>';
    return;
  }

  const rows = draftProducts.map(p => `
    <tr>
      <td><img class="admin-thumb" src="${p.image}" alt=""></td>
      <td>${p.name}<br><span class="admin-hint">${p.collection} · ₹${p.price}</span></td>
      <td class="admin-row-actions">
        <button type="button" data-edit="${p.id}">Edit</button>
        <button type="button" class="danger" data-delete="${p.id}">Delete</button>
      </td>
    </tr>
  `).join('');

  wrap.innerHTML = `
    <div class="admin-table-scroll">
      <table class="admin-table">
        <thead><tr><th>Photo</th><th>Product</th><th>Actions</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;

  wrap.querySelectorAll('[data-edit]').forEach(btn =>
    btn.addEventListener('click', () => startEdit(parseInt(btn.dataset.edit, 10))));
  wrap.querySelectorAll('[data-delete]').forEach(btn =>
    btn.addEventListener('click', () => deleteProduct(parseInt(btn.dataset.delete, 10))));
}

// ---------- form handling ----------
const form = document.getElementById('product-form');
const fName = document.getElementById('f-name');
const fCollection = document.getElementById('f-collection');
const fColor = document.getElementById('f-color');
const fPrice = document.getElementById('f-price');
const fImageFile = document.getElementById('f-image-file');
const fDescription = document.getElementById('f-description');
const saveBtn = document.getElementById('save-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const formTitle = document.getElementById('form-title');

let pendingImagePath = null;

fImageFile.addEventListener('change', () => {
  const file = fImageFile.files[0];
  if (!file) return;
  const suggested = `images/${slugify(fName.value || file.name.replace(/\.[^/.]+$/, ''))}.jpg`;
  pendingImagePath = suggested;
  document.getElementById('suggested-filename').textContent = suggested;
  document.getElementById('image-preview-wrap').style.display = 'block';
  const reader = new FileReader();
  reader.onload = e => { document.getElementById('image-preview').src = e.target.result; };
  reader.readAsDataURL(file);
});

function resetForm() {
  form.reset();
  editingId = null;
  pendingImagePath = null;
  document.getElementById('image-preview-wrap').style.display = 'none';
  formTitle.textContent = 'Add a product';
  saveBtn.textContent = 'Add product';
  cancelEditBtn.style.display = 'none';
}

function startEdit(id) {
  const p = draftProducts.find(p => p.id === id);
  if (!p) return;
  editingId = id;
  fName.value = p.name;
  fCollection.value = p.collection;
  fColor.value = p.color;
  fPrice.value = p.price;
  fDescription.value = p.description;
  pendingImagePath = p.image;
  formTitle.textContent = `Editing "${p.name}"`;
  saveBtn.textContent = 'Save changes';
  cancelEditBtn.style.display = 'inline-flex';
  window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
}

function deleteProduct(id) {
  const p = draftProducts.find(p => p.id === id);
  if (!p) return;
  if (!confirm(`Remove "${p.name}" from the catalogue?`)) return;
  draftProducts = draftProducts.filter(p => p.id !== id);
  if (editingId === id) resetForm();
  saveDraft();
  renderTable();
}

cancelEditBtn.addEventListener('click', resetForm);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    name: fName.value.trim(),
    collection: fCollection.value,
    color: fColor.value.trim(),
    price: parseInt(fPrice.value, 10) || 0,
    description: fDescription.value.trim(),
  };

  if (editingId) {
    const p = draftProducts.find(p => p.id === editingId);
    Object.assign(p, data);
    if (pendingImagePath) p.image = pendingImagePath;
  } else {
    draftProducts.push({
      id: nextId(),
      ...data,
      image: pendingImagePath || 'images/product-1.svg',
    });
  }

  saveDraft();
  renderTable();
  resetForm();
});

// ---------- generate & download products.js ----------
function generateFileText() {
  const header = `/*
  SILK ÉLEGANCE — PRODUCT DATA
  Generated by admin.html on ${new Date().toLocaleString()}
  Replace js/products.js in your project with this file.
*/

const PRODUCTS = [
`;
  const body = draftProducts.map(p => {
    const esc = s => String(s).replace(/"/g, '\\"');
    return `  { id: ${p.id}, name: "${esc(p.name)}", collection: "${esc(p.collection)}", color: "${esc(p.color)}", price: ${p.price}, image: "${esc(p.image)}", description: "${esc(p.description)}" },`;
  }).join('\n');
  return header + body + '\n];\n';
}

document.getElementById('download-btn').addEventListener('click', () => {
  const blob = new Blob([generateFileText()], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'products.js';
  a.click();
  URL.revokeObjectURL(url);
});

// ---------- passcode gate ----------
const lockScreen = document.getElementById('lock-screen');
const adminPanel = document.getElementById('admin-panel');
const passInput = document.getElementById('passcode-input');
const passError = document.getElementById('passcode-error');

function tryUnlock() {
  if (passInput.value === ADMIN_PASSCODE) {
    lockScreen.style.display = 'none';
    adminPanel.style.display = 'block';
    loadDraft();
    renderTable();
  } else {
    passError.style.display = 'block';
  }
}
document.getElementById('unlock-btn').addEventListener('click', tryUnlock);
passInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlock(); });

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
