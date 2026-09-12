const express = require('express');
const router = express.Router();
const { getOverview, getClicks } = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

router.get('/overview', protect, getOverview);
router.get('/clicks', protect, getClicks);

module.exports = router;
