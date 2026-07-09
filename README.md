# Silk Élegance — website

A simple, no-build website: just HTML, CSS and vanilla JavaScript. No installs, no frameworks, no build step. Open `index.html` in a browser and it works.

## File map

```
silkelegance/
├── index.html          ← homepage (hero, product grid, about, contact)
├── product.html         ← product detail page (reused for all 25 products)
├── css/
│   └── style.css        ← all styling, colours, fonts, animations
├── js/
│   ├── products.js      ← ⭐ YOUR PRODUCT DATA — edit this to add photos/products
│   ├── main.js           ← builds the homepage grid from products.js
│   └── product-page.js   ← builds the detail page from products.js
└── images/               ← put your product photos in here
```

## Adding your own product photos (the important part)

1. Save your photo into the `images` folder — square photos around 800×800px look best (e.g. `images/marigold-bloom.jpg`).
2. Open `js/products.js`.
3. Find the product you want to update and change its `image` field to your file, e.g.:

```js
{ id: 1, name: "Marigold Bloom", ..., image: "images/marigold-bloom.jpg" },
```

4. Save and refresh the page. That's it — both the homepage card and the detail page pull from this one field.

Until you replace them, every product uses a placeholder graphic so the site never looks broken.

## Adding a brand-new product

Open `js/products.js` and copy one block, then paste it before the closing `];`. Give it a unique `id` (the next free number) and fill in `name`, `collection` (`Bridal` / `Festive` / `Casual` — used by the filter pills), `color`, `price`, `image`, and `description`.

## Removing a product

Delete its whole `{ ... }` block from `js/products.js`.

## Changing WhatsApp / email contact details

Search for `910000000000` in `index.html` and `js/product-page.js` and replace it with your WhatsApp number (with country code, no `+` or spaces). Search for `hello@silkelegance.example` and replace with your real email address, in `index.html` and `js/product-page.js`.

## Admin page — adding products without editing code

Open `admin.html` in your browser (e.g. `yoursite.com/admin.html`).

1. Enter the passcode (set in `js/config.js`, default is `silk2026` — change it).
2. Fill the form: name, collection, colour, price, photo, description.
3. Click **Add product** — it appears in the catalogue list on the right immediately.
4. When you're done adding/editing/deleting, click **Download products.js**.
5. Take the downloaded file and replace `js/products.js` in your project with it.
6. Re-upload/redeploy your site so visitors see the change.

Notes:
- Your edits are saved in that browser only (as a draft) until you download the file — nothing changes on your live site automatically. This is a static website with no server, so there's no way for admin.html to write directly to your live files.
- The photo field only *previews* the image — it tells you a suggested filename (e.g. `images/sapphire-thread-coil.jpg`). You still need to save the actual photo file into your `images` folder using that exact filename.
- The passcode is a light deterrent, not real security — anyone who views the page source can read it. Don't link to `admin.html` from your public navigation, and don't rely on it to protect sensitive data.

## Custom enquiry — Google Form setup

The "Custom enquiry form" button on the homepage opens a Google Form you create. To set it up:

1. Go to forms.google.com and create a new form, e.g. "Silk Élegance — Custom Enquiry".
2. Add fields like: Name, Phone / WhatsApp number, Occasion (Bridal/Festive/Casual), Preferred colour, Reference photo (use a "File upload" question type), Budget, Notes.
3. Click **Send** (top right) → click the link icon → copy the short link (looks like `https://forms.gle/xxxxxxx`).
4. Open `js/config.js` and paste it in:
   ```js
   const GOOGLE_FORM_URL = "https://forms.gle/xxxxxxx";
   ```
5. Save — the homepage button now opens your real form in a new tab.

## Editing your contact details

Everything editable — WhatsApp number, email, Google Form link, admin passcode — now lives in one file: `js/config.js`. Edit it once and every page picks it up.

## Publishing the site

This is a plain static site, so any of these work with zero configuration:
- **Netlify / Vercel**: drag the whole `silkelegance` folder onto their dashboard.
- **GitHub Pages**: push the folder to a repo and enable Pages in settings.
- Any regular web host: upload the folder via FTP.

No server, database, or build step is required.
