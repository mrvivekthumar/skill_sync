const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// added a logging library 
const winston = require("winston");

// Create a Winston logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        // You can add more transports here, such as file, database, etc.
    ],
});

//auth
exports.auth = async (req, res, next) => {
    try {

        logger.info("BEFORE TOKEN EXTRACTION");
        //extract token
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization").replace("Bearer ", "");
        logger.info("AFTER TOKEN EXTRACTION");

        //if token missing, then return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'TOken is missing',
            });
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            logger.info("Token decoded:", decode);
            req.user = decode;
        }
        catch (err) {
            //verification - issue
            logger.error("Token verification failed:", err);
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
            });
        }
        next();
    }
    catch (error) {
        logger.error("Error validating token:", error);
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token',
        });
    }
}

//isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Students only',
            });
        }
        next();
    }
    catch (error) {
        logger.error("Error verifying student role:", error);
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        })
    }
}


//isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Instructor only',
            });
        }
        next();
    }
    catch (error) {
        logger.error("Error verifying instructor role:", error);
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        })
    }
}


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        logger.info("Printing AccountType ", req.user.accountType);
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Admin only',
            });
        }
        next();
    }
    catch (error) {
        logger.error("Error verifying admin role:", error);
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        })
    }
}