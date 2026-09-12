const mongoose = require('mongoose');

// One document per affiliate click, used for the analytics dashboard.
const clickSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String }, // denormalized snapshot, survives product deletion
    referrer: { type: String, default: '' },
    userAgent: { type: String, default: '' },
    ip: { type: String, default: '' }, // consider anonymizing/truncating for privacy
    device: { type: String, enum: ['mobile', 'desktop', 'tablet', 'unknown'], default: 'unknown' }
  },
  { timestamps: true }
);

clickSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Click', clickSchema);
