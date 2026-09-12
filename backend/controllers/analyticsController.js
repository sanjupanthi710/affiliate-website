const Click = require('../models/Click');
const Product = require('../models/Product');

// GET /api/analytics/overview  (admin)
const getOverview = async (req, res) => {
  const [totalClicks, totalProducts, last7DaysClicks, topProducts] = await Promise.all([
    Click.countDocuments(),
    Product.countDocuments(),
    Click.countDocuments({ createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),
    Product.find().sort({ clickCount: -1 }).limit(5).select('name slug clickCount viewCount price')
  ]);

  // clicks per day for the last 14 days, used for the analytics chart
  const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  const dailyClicks = await Click.aggregate([
    { $match: { createdAt: { $gte: since } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const deviceBreakdown = await Click.aggregate([
    { $group: { _id: '$device', count: { $sum: 1 } } }
  ]);

  res.json({
    totalClicks,
    totalProducts,
    last7DaysClicks,
    topProducts,
    dailyClicks,
    deviceBreakdown
  });
};

// GET /api/analytics/clicks  (admin) - paginated raw click log
const getClicks = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const pageNum = Math.max(Number(page) || 1, 1);
  const limitNum = Math.min(Number(limit) || 20, 100);
  const skip = (pageNum - 1) * limitNum;

  const [clicks, total] = await Promise.all([
    Click.find().sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Click.countDocuments()
  ]);

  res.json({ clicks, pagination: { total, page: pageNum, totalPages: Math.ceil(total / limitNum) } });
};

module.exports = { getOverview, getClicks };
