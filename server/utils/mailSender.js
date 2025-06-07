const nodemailer = require("nodemailer");
const logger = require("./logger")

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })


        let info = await transporter.sendMail({
            from: 'StudyNotion || vivek',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        logger.info("Email sent:", info);
        return info;
    }
    catch (error) {
        logger.error("Mail sending error:", error.message);
    }
}


module.exports = mailSender;