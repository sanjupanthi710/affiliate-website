const Product = require('../models/Product');
const { makeUniqueSlug } = require('../utils/slugify');

// GET /api/products
// Supports: ?search=&category=&sort=&featured=&trending=&deals=&page=&limit=&minPrice=&maxPrice=&minRating=
const getProducts = async (req, res) => {
  const {
    search,
    category,
    sort = 'newest',
    featured,
    trending,
    deals,
    page = 1,
    limit = 12,
    minPrice,
    maxPrice,
    minRating
  } = req.query;

  const query = { status: 'active' };

  if (search) query.$text = { $search: search };
  if (category) query.category = category;
  if (featured === 'true') query.isFeatured = true;
  if (trending === 'true') query.isTrending = true;
  if (deals === 'true') query.isDeal = true;
  if (minRating) query.rating = { $gte: Number(minRating) };
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const sortMap = {
    newest: { createdAt: -1 },
    price_low: { price: 1 },
    price_high: { price: -1 },
    rating: { rating: -1 },
    popular: { clickCount: -1 }
  };
  const sortBy = sortMap[sort] || sortMap.newest;

  const pageNum = Math.max(Number(page) || 1, 1);
  const limitNum = Math.min(Number(limit) || 12, 48);
  const skip = (pageNum - 1) * limitNum;

  const [products, total] = await Promise.all([
    Product.find(query).populate('category', 'name slug').sort(sortBy).skip(skip).limit(limitNum),
    Product.countDocuments(query)
  ]);

  res.json({
    products,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum)
    }
  });
};

// GET /api/products/:slug
const getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, status: 'active' }).populate(
    'category',
    'name slug'
  );
  if (!product) return res.status(404).json({ message: 'Product not found' });

  product.viewCount += 1;
  await product.save();

  // simple "related products" - same category, excluding this one
  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
    status: 'active'
  })
    .limit(4)
    .select('name slug images price originalPrice rating reviewCount');

  res.json({ product, related });
};

// GET /api/products/admin/all  (admin - includes drafts/archived)
const getAllProductsAdmin = async (req, res) => {
  const products = await Product.find().populate('category', 'name slug').sort({ createdAt: -1 });
  res.json(products);
};

// GET /api/products/id/:id  (admin - fetch raw by id for edit form)
const getProductByIdAdmin = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

// POST /api/products  (admin)
const createProduct = async (req, res) => {
  const data = req.body;
  if (!data.name || !data.affiliateUrl || !data.category || data.price === undefined) {
    return res.status(400).json({ message: 'name, category, price and affiliateUrl are required' });
  }

  const slug = await makeUniqueSlug(Product, data.name);
  const product = await Product.create({ ...data, slug });
  res.status(201).json(product);
};

// PUT /api/products/:id  (admin)
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const data = req.body;
  if (data.name && data.name !== product.name) {
    data.slug = await makeUniqueSlug(Product, data.name, product._id);
  }

  Object.assign(product, data);
  await product.save();
  res.json(product);
};

// DELETE /api/products/:id  (admin)
const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted' });
};

// POST /api/products/:id/click  -> logs a click and returns the real affiliate URL
const recordClickAndRedirectInfo = async (req, res) => {
  const Click = require('../models/Click');
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  product.clickCount += 1;
  await product.save();

  const ua = req.headers['user-agent'] || '';
  const device = /mobile/i.test(ua) ? 'mobile' : /tablet|ipad/i.test(ua) ? 'tablet' : 'desktop';

  await Click.create({
    product: product._id,
    productName: product.name,
    referrer: req.headers.referer || req.body.referrer || '',
    userAgent: ua,
    ip: req.ip,
    device
  });

  res.json({ affiliateUrl: product.affiliateUrl });
};

module.exports = {
  getProducts,
  getProductBySlug,
  getAllProductsAdmin,
  getProductByIdAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  recordClickAndRedirectInfo
};
