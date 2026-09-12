const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true, maxlength: 200 },
    description: { type: String, required: true },

    images: { type: [String], default: [] }, // array of image URLs, first = primary
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },

    brand: { type: String, default: '' },

    price: { type: Number, required: true }, // current price
    originalPrice: { type: Number }, // "was" price, used to compute discount
    currency: { type: String, default: 'USD' },

    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },

    features: { type: [String], default: [] },
    pros: { type: [String], default: [] },
    cons: { type: [String], default: [] },

    // The real destination — your affiliate link (Amazon Associates, etc.)
    affiliateUrl: { type: String, required: true },
    affiliateNetwork: { type: String, default: 'Amazon Associates' },

    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isDeal: { type: Boolean, default: false },
    dealEndsAt: { type: Date },

    clickCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },

    status: { type: String, enum: ['active', 'draft', 'archived'], default: 'active' },

    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' }
  },
  { timestamps: true }
);

productSchema.virtual('discountPercent').get(function () {
  if (!this.originalPrice || this.originalPrice <= this.price) return 0;
  return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

productSchema.index({ name: 'text', shortDescription: 'text', description: 'text', brand: 'text' });

module.exports = mongoose.model('Product', productSchema);
