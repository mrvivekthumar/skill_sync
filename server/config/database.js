const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("../utils/logger");

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => logger.info("DB Connected Successfully"))
        .catch((error) => {
            logger.error("DB Connection Issue:", error);
            process.exit(1);
        })
}