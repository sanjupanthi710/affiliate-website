const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const signToken = (admin) =>
  jwt.sign({ id: admin._id, email: admin.email, name: admin.name }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = signToken(admin);
  res.json({
    token,
    admin: { id: admin._id, name: admin.name, email: admin.email }
  });
};

// GET /api/auth/me
const me = async (req, res) => {
  res.json({ admin: req.admin });
};

module.exports = { login, me };
