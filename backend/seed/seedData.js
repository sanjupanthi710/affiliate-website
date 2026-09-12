/**
 * One-time seed script.
 * Run with: npm run seed  (from the backend/ folder)
 *
 * Creates the admin login (from .env), a set of demo categories,
 * and sample products with DEMO affiliate links you should replace
 * via the admin dashboard before going live.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Admin = require('../models/Admin');
const { makeUniqueSlug } = require('../utils/slugify');

const categoriesData = [
  { name: 'Electronics', icon: '💻', description: 'Laptops, headphones, gadgets and more.' },
  { name: 'Home & Kitchen', icon: '🏠', description: 'Appliances and everyday home essentials.' },
  { name: 'Fitness', icon: '🏋️', description: 'Gear to help you train smarter.' },
  { name: 'Fashion', icon: '👕', description: 'Apparel, footwear and accessories.' },
  { name: 'Books', icon: '📚', description: 'Bestsellers and reader favorites.' }
];

// NOTE: affiliateUrl values below are DEMO placeholders.
// Replace them with your real tracked affiliate links in the admin dashboard.
const productsData = [
  {
    name: 'Aero Noise-Cancelling Wireless Headphones',
    shortDescription: 'Over-ear ANC headphones with 40-hour battery life.',
    description:
      'Immerse yourself in your music with industry-leading active noise cancellation. Featuring plush memory-foam ear cushions, a 40-hour battery on a single charge, and quick-charge support for 5 hours of playback from just 10 minutes of charging. Built-in mic array for crystal-clear calls.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800'
    ],
    category: 'Electronics',
    brand: 'Aero Audio',
    price: 179.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviewCount: 2318,
    features: ['Active Noise Cancellation', '40-hour battery life', 'Bluetooth 5.3', 'Quick charge (5h from 10min)', 'Foldable design with carrying case'],
    pros: ['Excellent noise cancellation for the price', 'Very comfortable for long sessions', 'Strong battery life'],
    cons: ['Touch controls can be finicky', 'Case is a bit bulky'],
    affiliateUrl: 'https://www.amazon.com/dp/DEMO-HEADPHONES-001?tag=your-affiliate-id-20',
    affiliateNetwork: 'Amazon Associates',
    isFeatured: true,
    isTrending: true
  },
  {
    name: 'Nimbus 15" Ultralight Laptop',
    shortDescription: 'Fanless ultrabook with all-day battery and a 15" 2K display.',
    description:
      'The Nimbus packs a 12-core processor and 16GB of RAM into a 2.8lb magnesium chassis. The 2K IPS display covers 100% sRGB, and the 70Wh battery delivers up to 18 hours of real-world use. Perfect for professionals who need power without the weight.',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'
    ],
    category: 'Electronics',
    brand: 'Nimbus',
    price: 999.0,
    originalPrice: 1199.0,
    rating: 4.4,
    reviewCount: 864,
    features: ['12-core CPU', '16GB RAM / 512GB SSD', '15" 2K IPS display', '18-hour battery', '2.8 lb / 1.27 kg'],
    pros: ['Superb portability', 'Bright, color-accurate screen', 'Silent, fanless operation'],
    cons: ['Limited port selection', 'Speakers are just average'],
    affiliateUrl: 'https://www.amazon.com/dp/DEMO-LAPTOP-002?tag=your-affiliate-id-20',
    affiliateNetwork: 'Amazon Associates',
    isFeatured: true
  },
  {
    name: 'PulseFit Smart Fitness Watch',
    shortDescription: 'GPS fitness watch with 14-day battery and 24/7 heart rate tracking.',
    description:
      'Track over 100 workout modes, monitor your heart rate and blood oxygen 24/7, and get accurate GPS routes without needing your phone. The always-on AMOLED display stays crisp in direct sunlight, and the 14-day battery means you charge it twice a month, not every night.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800'
    ],
    category: 'Fitness',
    brand: 'PulseFit',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.3,
    reviewCount: 5120,
    features: ['Built-in GPS', '14-day battery life', '100+ sport modes', '5ATM water resistance', 'SpO2 & heart-rate monitoring'],
    pros: ['Fantastic battery life', 'Accurate GPS tracking', 'Great value for the features'],
    cons: ['App can be slow to sync', 'Band material attracts lint'],
    affiliateUrl: 'https://www.amazon.com/dp/DEMO-WATCH-003?tag=your-affiliate-id-20',
    affiliateNetwork: 'Amazon Associates',
    isTrending: true,
    isDeal: true
  },
  {
    name: 'BrewMaster Precision Pour-Over Kettle',
    shortDescription: 'Gooseneck electric kettle with 1°F precision temperature control.',
    description:
      'Dial in the exact temperature for pour-over, French press or tea with 1-degree precision. The gooseneck spout gives you complete control over your pour, and the kettle keeps water at your chosen temperature for up to an hour.',
    images: [
      'https://images.unsplash.com/photo-1516685018646-549198525c1b?w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800'
    ],
    category: 'Home & Kitchen',
    brand: 'BrewMaster',
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.7,
    reviewCount: 1432,
    features: ['1°F precision control', 'Gooseneck spout', 'Keep-warm mode (1 hour)', '0.9L capacity', 'Matte black finish'],
    pros: ['Precise, consistent temperature', 'Comfortable to pour even when full', 'Looks great on the counter'],
    cons: ['Cord is on the shorter side', 'No auto shut-off timer display'],
    affiliateUrl: 'https://www.amazon.com/dp/DEMO-KETTLE-004?tag=your-affiliate-id-20',
    affiliateNetwork: 'Amazon Associates',
    isDeal: true
  },
  {
    name: 'Aria Merino Wool Travel Hoodie',
    shortDescription: 'Odor-resistant merino-blend hoodie built for long flights.',
    description:
      'A merino wool blend that regulates temperature and resists odor for days of wear between washes. Hidden zip pockets keep your passport and phone secure, and the four-way stretch fabric moves with you through security lines and layovers alike.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'
    ],
    category: 'Fashion',
    brand: 'Aria',
    price: 98.0,
    originalPrice: 128.0,
    rating: 4.5,
    reviewCount: 673,
    features: ['Merino wool blend', 'Hidden zip pockets', '4-way stretch', 'Odor-resistant', 'Machine washable'],
    pros: ['Genuinely wearable for multi-day trips', 'Soft against skin, not itchy', 'Packs down small'],
    cons: ['Runs slightly small - size up', 'Premium price for a hoodie'],
    affiliateUrl: 'https://www.amazon.com/dp/DEMO-HOODIE-005?tag=your-affiliate-id-20',
    affiliateNetwork: 'Amazon Associates',
    isTrending: true
  },
  {
    name: 'Atlas: A Concise History of Everything',
    shortDescription: 'A best-selling, illustrated tour through 13.8 billion years of history.',
    description:
      'From the Big Bang to the present day, Atlas weaves cosmology, biology and human history into one accessible narrative. Packed with illustrations and infographics, it is the kind of book you will pick up again and again.',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'
    ],
    category: 'Books',
    brand: 'Horizon Press',
    price: 18.49,
    originalPrice: 24.99,
    rating: 4.8,
    reviewCount: 9021,
    features: ['416 pages, hardcover', 'Full-color illustrations throughout', 'Includes 40-page timeline foldout'],
    pros: ['Beautifully designed and illustrated', 'Approachable for non-experts', 'Great gift book'],
    cons: ['Some topics only get a page or two', 'Hardcover adds bulk for travel'],
    affiliateUrl: 'https://www.amazon.com/dp/DEMO-BOOK-006?tag=your-affiliate-id-20',
    affiliateNetwork: 'Amazon Associates',
    isDeal: true
  },
  {
    name: 'CoreFlex Adjustable Dumbbell Set (5-52.5 lb)',
    shortDescription: 'Space-saving adjustable dumbbells that replace 15 pairs of weights.',
    description:
      'A dial lets you switch from 5 to 52.5 lbs per dumbbell in seconds, replacing an entire rack of weights with two compact units. The durable metal plates and secure locking mechanism make this a favorite for home gyms.',
    images: [
      'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
    ],
    category: 'Fitness',
    brand: 'CoreFlex',
    price: 429.0,
    originalPrice: 549.0,
    rating: 4.6,
    reviewCount: 3104,
    features: ['5 to 52.5 lb per dumbbell', 'Quick-turn dial adjustment', 'Includes storage tray', 'Durable steel plates'],
    pros: ['Massive space savings vs. a full rack', 'Quick to switch weights mid-workout', 'Sturdy, confidence-inspiring build'],
    cons: ['Heavier and bulkier than fixed dumbbells at max weight', 'Higher upfront cost'],
    affiliateUrl: 'https://www.amazon.com/dp/DEMO-DUMBBELL-007?tag=your-affiliate-id-20',
    affiliateNetwork: 'Amazon Associates',
    isFeatured: true
  },
  {
    name: 'LumaGlow Smart LED Desk Lamp',
    shortDescription: 'App-controlled desk lamp with adjustable color temperature and wireless charging base.',
    description:
      'Tune the color temperature from warm to daylight, set schedules from the companion app, and charge your phone wirelessly right from the base. The flicker-free LED array is rated for 25,000 hours and is easy on the eyes during long work sessions.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
      'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=800'
    ],
    category: 'Home & Kitchen',
    brand: 'LumaGlow',
    price: 54.99,
    originalPrice: 74.99,
    rating: 4.4,
    reviewCount: 1890,
    features: ['Adjustable color temperature (2700K-6500K)', 'Built-in 10W wireless charger', 'App + voice control', 'Flicker-free, 25,000-hour LED'],
    pros: ['Wireless charging base is genuinely useful', 'Great range of brightness and warmth', 'App is simple to set up'],
    cons: ['Arm has limited reach for large desks', 'No physical dimmer, app-only for some settings'],
    affiliateUrl: 'https://www.amazon.com/dp/DEMO-LAMP-008?tag=your-affiliate-id-20',
    affiliateNetwork: 'Amazon Associates',
    isTrending: true
  }
];

const run = async () => {
  await connectDB();

  console.log('Clearing existing categories & products...');
  await Category.deleteMany({});
  await Product.deleteMany({});

  console.log('Seeding categories...');
  const categoryMap = {};
  for (const cat of categoriesData) {
    const slug = await makeUniqueSlug(Category, cat.name);
    const created = await Category.create({ ...cat, slug });
    categoryMap[cat.name] = created._id;
  }

  console.log('Seeding products...');
  for (const p of productsData) {
    const slug = await makeUniqueSlug(Product, p.name);
    await Product.create({ ...p, slug, category: categoryMap[p.category] });
  }

  console.log('Setting up admin account...');
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await Admin.create({
      name: 'Site Admin',
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'ChangeMe123!'
    });
    console.log(`Admin created: ${adminEmail}`);
  } else {
    console.log(`Admin already exists: ${adminEmail}`);
  }

  console.log('Seed complete!');
  mongoose.connection.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
