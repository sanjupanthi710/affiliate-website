const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: '' },
    icon: { type: String, default: '' }, // emoji or icon class, shown on category cards
    image: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
