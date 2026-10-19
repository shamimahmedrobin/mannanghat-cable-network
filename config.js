/* =====================================================================
   MANNANGHAT CABLE NETWORK — all website content lives here
   ---------------------------------------------------------------------
   Everything visible on the site (phone numbers, packages, areas,
   payment numbers, FAQs, notices) comes from this file. To change
   anything, edit ONLY this file — no other file needs touching.

   Leave a value empty ("") to hide that item (e.g. facebook).
   ===================================================================== */

const SITE = {
  brand: "Mannanghat Cable Network",
  brandShort: "Mannanghat",
  tagline: "Reliable fiber internet, right at your doorstep",
  heroTitle: "Buffer-free internet,",
  heroTitleAccent: "every day, every moment.",
  heroSub: "Pure fiber-optic connection • Unlimited data • 24/7 support",

  // ---- Contact ----
  hotline: "01314773796",
  hotlineDisplay: "01314-773796",
  whatsapp: "8801314773796", // for wa.me links: country code (880) + number, no spaces
  facebook: "", // empty = Facebook link hidden
  address: "Songbadpur Bazar (Mannanghat), Jamalganj, Sunamganj",
  hours: "Open daily, 9 AM – 10 PM",
  statSpeed: "60 Mbps",

  // ---- Speed test button link ----
  speedTestUrl: "https://www.speedtest.net/",
};

/* ------------------------- Packages ------------------------- */
// price: monthly charge (Tk). popular: true highlights the card.
const PACKAGES = [
  { name: "Basic",    speed: "20 Mbps",  price: 500,  popular: false, features: ["Unlimited data", "HD video streaming", "Free installation support"] },
  { name: "Standard", speed: "30 Mbps",  price: 600,  popular: true,  features: ["Unlimited data", "4K streaming", "Online-gaming friendly", "Free installation support"] },
  { name: "Premium",  speed: "40 Mbps",  price: 700,  popular: false, features: ["Unlimited data", "4K streaming", "Gaming + freelancing", "Priority support"] },
  { name: "Ultra",    speed: "60 Mbps",  price: 800,  popular: false, features: ["Unlimited data", "Heavy users / office", "Priority support", "Dedicated line facility"] },
];

/* ------------------------- Coverage areas ------------------------- */
// Empty for now — add area names and the coverage section reappears automatically.
const COVERAGE_AREAS = [];

/* ------------------------- Bill payment ------------------------- */
const PAYMENTS = [
  { method: "bKash",  number: "01314773796", note: "Merchant number — make payment" },
];
const PAYMENT_STEPS = [
  "Pay your monthly bill to the bKash merchant number above",
  "Enter your customer ID as reference.",
  "Contact Helpline if you forget to provide reference ID.",
];

/* ------------------------- Why us ------------------------- */
const FEATURES = [
  { title: "Pure Fiber", desc: "Fiber-optic line to your home — stable speeds, no disconnections in the rain." },
  { title: "Unlimited Data", desc: "No FUP or data caps. Use as much as you like; speed never drops." },
  { title: "24/7 Support", desc: "Hotline or WhatsApp for any issue — fast resolution, guaranteed." },
  { title: "Easy Bill Payment", desc: "Pay from home via bKash. No queues, no hassle." },
];

/* ------------------------- FAQ ------------------------- */
const FAQS = [
  { q: "What do I need for a new connection?", a: "Just your name, mobile number and address. Fill in the 'Get Connected' form — our team will contact you within 24 hours." },
  { q: "How much is the installation charge?", a: "Installation charges vary by area and package. Submit the form and our team will confirm the exact amount for your area." },
  { q: "Do you provide a router?", a: "You can get a router from us, or use your own." },
  { q: "Will the speed stay consistent?", a: "We never throttle speeds. However, your experience may vary if many devices use heavy bandwidth on the same line at once." },
  { q: "How do I pay my bill?", a: "Pay via bKash to our merchant number. The number and steps are in the Bill Payment section." },
  { q: "What should I do if the line goes down?", a: "Call the hotline directly or message us on WhatsApp. Our technicians will act quickly." },
];

/* ------------------------- Notice board ------------------------- */
// Add { date, text } lines for new notices. Empty = section hidden.
const NOTICES = [
  { date: "Oct 19", text: "Welcome! Our new website is live. Share any feedback on the hotline." },
];
