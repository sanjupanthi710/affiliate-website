const Category = require('../models/Category');
const Product = require('../models/Product');
const { makeUniqueSlug } = require('../utils/slugify');

// GET /api/categories
const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });

  // include a live product count per category, useful for the homepage grid
  const withCounts = await Promise.all(
    categories.map(async (cat) => {
      const count = await Product.countDocuments({ category: cat._id, status: 'active' });
      return { ...cat.toObject(), productCount: count };
    })
  );

  res.json(withCounts);
};

// GET /api/categories/:slug
const getCategoryBySlug = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json(category);
};

// POST /api/categories  (admin)
const createCategory = async (req, res) => {
  const { name, description, icon, image } = req.body;
  if (!name) return res.status(400).json({ message: 'Category name is required' });

  const slug = await makeUniqueSlug(Category, name);
  const category = await Category.create({ name, slug, description, icon, image });
  res.status(201).json(category);
};

// PUT /api/categories/:id  (admin)
const updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });

  const { name, description, icon, image } = req.body;
  if (name && name !== category.name) {
    category.slug = await makeUniqueSlug(Category, name, category._id);
    category.name = name;
  }
  if (description !== undefined) category.description = description;
  if (icon !== undefined) category.icon = icon;
  if (image !== undefined) category.image = image;

  await category.save();
  res.json(category);
};

// DELETE /api/categories/:id  (admin)
const deleteCategory = async (req, res) => {
  const inUse = await Product.countDocuments({ category: req.params.id });
  if (inUse > 0) {
    return res.status(400).json({
      message: `Cannot delete: ${inUse} product(s) still use this category. Reassign or delete them first.`
    });
  }
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json({ message: 'Category deleted' });
};

module.exports = { getCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory };
