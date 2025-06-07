exports.contactUsEmail = (email, firstname, lastname, message, phoneNo, countrycode) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Contact Form Received</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
                text-align: left;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="study-notion-frontend-wheat.vercel.app"><img class="logo"
                    src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
            <div class="message">Contact Form Submission Received</div>
            <div class="body">
                <p>Dear ${firstname} ${lastname},</p>
                <p>Thank you for contacting us! We have received your message and will get back to you soon.</p>
                
                <p><strong>Your Contact Details:</strong></p>
                <p>Email: <span class="highlight">${email}</span></p>
                <p>Phone: <span class="highlight">${countrycode} ${phoneNo}</span></p>
                
                <p><strong>Your Message:</strong></p>
                <p>${message}</p>
                
                <p>We typically respond within 24-48 hours. If your inquiry is urgent, please feel free to call us directly.</p>
            </div>
            <div class="support">If you have any additional questions, please feel free to reach out to us at 
                    href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
        </div>
    </body>
    
    </html>`;
};