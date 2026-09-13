const cloudinary = require('cloudinary').v2;

//  this is a debug log to help identify issues with Cloudinary configuration
console.log('--- DEBUG CLOUDINARY CONFIG ---');
console.log('Cloud Name received:', `"${process.env.CLOUDINARY_CLOUD_NAME}"`);
console.log('API Key exists?:', !!process.env.CLOUDINARY_API_KEY);
console.log('API Secret exists?:', !!process.env.CLOUDINARY_API_SECRET);
console.log('-------------------------------');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;