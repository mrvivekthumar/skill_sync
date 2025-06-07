const cloudinary = require('cloudinary').v2;  //! Cloudinary is being required
require("dotenv").config();


exports.cloudinaryConnect = () => {

    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    } catch (error) {
        logger.error("Cloudinary connection error:", error);
    }
} 