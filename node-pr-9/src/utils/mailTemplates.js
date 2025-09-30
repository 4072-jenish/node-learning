const { sendMail } = require("../middleware/mailer");

/** 
 * @param {String} firstName 
 * @param {String} lastName 
 * @param {String} email 
 * @param {string} plainPassword 
 */
const sendCredentialsMail = async (user, plainPassword) => {
  const subject = "Welcome to Company Portal";

  const text = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Creation Email</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f5f7fa;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }
        
        .email-container {
            max-width: 600px;
            width: 100%;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .email-header {
            background: linear-gradient(135deg, #4361ee, #3a0ca3);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .email-header h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }
        
        .email-header p {
            opacity: 0.9;
        }
        
        .email-body {
            padding: 30px;
        }
        
        .greeting {
            font-size: 20px;
            margin-bottom: 20px;
            color: #333;
        }
        
        .message {
            margin-bottom: 25px;
            line-height: 1.6;
            color: #555;
        }
        
        .credentials {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            border-left: 4px solid #4361ee;
        }
        
        .credential-item {
            margin-bottom: 12px;
            display: flex;
        }
        
        .credential-label {
            font-weight: 600;
            min-width: 80px;
            color: #333;
        }
        
        .credential-value {
            color: #4361ee;
            font-weight: 500;
        }
        
        .instructions {
            background: #e7f5ff;
            border-radius: 8px;
            padding: 18px;
            margin: 25px 0;
            border-left: 4px solid #4cc9f0;
        }
        
        .instructions p {
            margin-bottom: 8px;
            color: #2c3e50;
        }
        
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        
        .login-button {
            display: inline-block;
            background: #4361ee;
            color: #ffffff;
            padding: 14px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .login-button:hover {
            background: #3a0ca3;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(58, 12, 163, 0.3);
        }
        
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #777;
            font-size: 14px;
        }
        
        .highlight {
            color: #3a0ca3;
            font-weight: 600;
        }
        
        .password-warning {
            color: #e63946;
            font-weight: 600;
            margin-top: 10px;
        }
        
        @media (max-width: 600px) {
            .email-body {
                padding: 20px;
            }
            
            .email-header {
                padding: 20px;
            }
            
            .email-header h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Welcome to Our Platform</h1>
            <p>Your account has been successfully created</p>
        </div>
        
        <div class="email-body">
            <h2 class="greeting">Hello ${user.firstName},</h2>
            
            <p class="message">Thank you for joining us! Your account has been created successfully and is ready to use.</p>
            
            <div class="credentials">
                <div class="credential-item">
                    <span class="credential-label">Email:</span>
                    <span class="credential-value">${user.email}</span>
                </div>
                <div class="credential-item">
                    <span class="credential-label">Password:</span>
                    <span class="credential-value">${plainPassword}</span>
                </div>
            </div>
            
            <div class="instructions">
                <p>For your security, we recommend that you:</p>
                <p>• Change your password after first login</p>
                <p>• Enable two-factor authentication</p>
                <p>• Review your account settings</p>
            </div>
            
            <p class="password-warning">Please keep your login credentials secure and do not share them with anyone.</p>
            
            <div class="button-container">
                <a href="#" class="login-button">Login to Your Account</a>
            </div>
            
            <div class="footer">
                <p>If you have any questions, please contact our support team.</p>
                <p>&copy; 2023 Your Company Name. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>`;

  await sendMail(user.email, subject, text);
};

module.exports = { sendCredentialsMail };
