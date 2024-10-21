const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME ||  "drsjloigq",
    api_key: process.env.CLOUD_API_KEY ||  "926793658896175",
    api_secret: process.env.CLOUD_API_SECRET ||  "5QhoDhOiODpETRSYUrRYDzu5tv0"
});


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowed_formats: ['png', 'jpeg', 'jpg'],
        folder: 'flor-de-sal'
    }
});

module.exports = multer({ storage });