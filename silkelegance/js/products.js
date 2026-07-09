/*
  SILK ÉLEGANCE — PRODUCT DATA
  ============================
  This is the ONLY file you need to edit to manage your catalogue.

  HOW TO ADD YOUR OWN PHOTOS:
  1. Drop your product photo into the /images folder.
     (Square photos, roughly 800x800px, work best.)
  2. Set the "image" field below to that filename, e.g. "images/my-bangle-1.jpg"
  3. That's it — the homepage grid and the product page both read from here.

  HOW TO ADD A NEW PRODUCT:
  - Copy one block below, paste it before the closing "];",
    give it a unique "id" (just the next number), and fill in the details.

  HOW TO REMOVE A PRODUCT:
  - Delete its whole { ... } block.
*/

const PRODUCTS = [
  { id: 1,  name: "Marigold Bloom",      collection: "Festive",  color: "Marigold Gold",     price: 449, image: "imagesmarigold-real.jpeg",  description: "Hand-wound marigold-gold silk thread over a lightweight brass base, finished with a cluster of mirror-work beads. A festive staple that layers beautifully with gold jewellery." },
  { id: 2,  name: "Rani Pink Raga",      collection: "Bridal",   color: "Rani Pink",         price: 599, image: "images/product-2.svg",  description: "Deep rani pink thread wrapped in a traditional raga pattern, studded with kundan stones. Designed for the bride who wants colour without losing elegance." },
  { id: 3,  name: "Peacock Teal Weave",  collection: "Casual",   color: "Peacock Teal",      price: 379, image: "images/product-3.svg",  description: "A cool peacock-teal weave with a matte thread finish, perfect for everyday wear over kurtas and cottons." },
  { id: 4,  name: "Emerald Zari Coil",   collection: "Festive",  color: "Emerald Green",     price: 529, image: "images/product-4.svg",  description: "Emerald silk thread coiled with fine zari edging, giving each bangle a subtle metallic glint under light." },
  { id: 5,  name: "Sunset Kundan",       collection: "Bridal",   color: "Sunset Orange",     price: 649, image: "images/product-5.svg",  description: "Warm sunset-orange thread paired with hand-set kundan stones along the outer edge. A statement piece for evening functions." },
  { id: 6,  name: "Ivory Pearl Trail",   collection: "Bridal",   color: "Ivory White",       price: 599, image: "images/product-6.svg",  description: "Ivory thread base trailed with tiny seed pearls, designed to sit quietly elegant against darker outfits." },
  { id: 7,  name: "Maroon Temple Coil",  collection: "Festive",  color: "Deep Maroon",       price: 469, image: "images/product-7.svg",  description: "A temple-inspired coil pattern in deep maroon thread, finished with antique-gold accent beads." },
  { id: 8,  name: "Turquoise Drop",      collection: "Casual",   color: "Turquoise Blue",    price: 349, image: "images/product-8.svg",  description: "Light turquoise thread with a single hanging drop bead — an easy everyday bangle that adds a pop of colour." },
  { id: 9,  name: "Sandalwood Weft",     collection: "Casual",   color: "Sandalwood Beige",  price: 329, image: "images/product-9.svg",  description: "Earthy sandalwood-toned thread woven tight and smooth, made to pair with neutral and pastel outfits." },
  { id: 10, name: "Royal Purple Zari",   collection: "Festive",  color: "Royal Purple",      price: 489, image: "images/product-10.svg", description: "Rich purple silk thread with fine zari inlay, a favourite for Navratri and other festive gatherings." },
  { id: 11, name: "Coral Reef Bloom",    collection: "Casual",   color: "Coral Pink",        price: 359, image: "images/product-11.svg", description: "A coral-pink weave finished with small floral-shaped thread knots, light enough for daily wear." },
  { id: 12, name: "Midnight Zircon",     collection: "Bridal",   color: "Midnight Blue",     price: 579, image: "images/product-12.svg", description: "Midnight-blue thread studded with zircon stones that catch the light with every movement of the wrist." },
  { id: 13, name: "Mango Yellow Twist",  collection: "Festive",  color: "Mango Yellow",      price: 399, image: "images/product-13.svg", description: "A cheerful mango-yellow twist pattern, traditionally paired with green bangles for festive stacking." },
  { id: 14, name: "Rose Gold Filigree",  collection: "Bridal",   color: "Rose Gold",         price: 619, image: "images/product-14.svg", description: "Rose-gold toned thread with a delicate filigree-style beadwork border, made for engagement functions." },
  { id: 15, name: "Bottle Green Trail",  collection: "Casual",   color: "Bottle Green",      price: 339, image: "images/product-15.svg", description: "A deep bottle-green thread bangle with a simple, refined finish — easy to dress up or down." },
  { id: 16, name: "Copper Sunrise",      collection: "Festive",  color: "Copper Orange",     price: 459, image: "images/product-16.svg", description: "Copper-orange thread wound in a sunrise pattern, finished with tiny brass discs along the rim." },
  { id: 17, name: "Lavender Mist",       collection: "Casual",   color: "Lavender",          price: 319, image: "images/product-17.svg", description: "A soft lavender weave with a gentle sheen, designed for pastel and monochrome outfits." },
  { id: 18, name: "Crimson Kalash",      collection: "Bridal",   color: "Crimson Red",       price: 639, image: "images/product-18.svg", description: "Crimson-red thread bangle with kalash-inspired beadwork, traditionally worn by brides for auspicious occasions." },
  { id: 19, name: "Steel Grey Minimal",  collection: "Casual",   color: "Steel Grey",        price: 299, image: "images/product-19.svg", description: "A clean, minimal steel-grey thread bangle for those who prefer understated everyday jewellery." },
  { id: 20, name: "Champagne Gold Coil", collection: "Bridal",   color: "Champagne Gold",    price: 589, image: "images/product-20.svg", description: "Champagne-gold thread coiled tightly and finished with a row of tiny faux-diamond studs." },
  { id: 21, name: "Fuchsia Fiesta",      collection: "Festive",  color: "Fuchsia Pink",      price: 419, image: "images/product-21.svg", description: "A vibrant fuchsia weave with a playful festive pattern, made for celebrations that call for colour." },
  { id: 22, name: "Olive Thread Knot",   collection: "Casual",   color: "Olive Green",       price: 309, image: "images/product-22.svg", description: "Olive-green thread finished in a simple knot pattern — understated, versatile, easy to layer." },
  { id: 23, name: "Wine Velvet Weave",   collection: "Bridal",   color: "Wine Red",          price: 609, image: "images/product-23.svg", description: "A wine-red thread bangle with a velvet-smooth finish and delicate pearl edging for bridal sets." },
  { id: 24, name: "Amber Glow Twist",    collection: "Festive",  color: "Amber Yellow",      price: 389, image: "images/product-24.svg", description: "Amber-yellow thread twisted with fine gold piping, made to shine under festive lighting." },
  { id: 25, name: "Onyx Thread Classic", collection: "Casual",   color: "Onyx Black",        price: 359, image: "images/product-25.svg", description: "A classic black thread bangle with a subtle sheen — the one piece that goes with absolutely everything." },
];
