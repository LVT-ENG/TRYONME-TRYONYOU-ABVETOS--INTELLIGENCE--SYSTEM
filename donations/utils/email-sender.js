/**
 * Email sender for donation receipts
 */

const nodemailer = require('nodemailer');
const path = require('path');

// Create transporter (configure with your email service)
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'demo@tryonyou.app',
      pass: process.env.SMTP_PASS || 'demo_password'
    }
  });
};

async function sendReceiptEmail(recipientEmail, donation, receiptPath) {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Armario Solidario',
        address: process.env.SMTP_FROM || 'donations@tryonyou.app'
      },
      to: recipientEmail,
      subject: '💝 Thank you for your donation to Armario Solidario!',
      html: generateEmailHTML(donation),
      attachments: [
        {
          filename: `armario-solidario-receipt-${donation.id}.pdf`,
          path: receiptPath,
          contentType: 'application/pdf'
        }
      ]
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Receipt email sent to ${recipientEmail}:`, result.messageId);
    
    return result;
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send receipt email');
  }
}

function generateEmailHTML(donation) {
  const donorName = donation.donorInfo?.name || 'Dear Donor';
  const amount = `${donation.amount} ${(donation.currency || 'EUR').toUpperCase()}`;
  const date = new Date(donation.createdAt || Date.now()).toLocaleDateString();
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Donation Receipt - Armario Solidario</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
            }
            .container {
                background: white;
                border-radius: 12px;
                padding: 40px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #e2e8f0;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #667eea;
                margin-bottom: 10px;
            }
            .subtitle {
                color: #718096;
                font-size: 16px;
            }
            .donation-details {
                background: #f7fafc;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e2e8f0;
            }
            .detail-row:last-child {
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }
            .detail-label {
                font-weight: 600;
                color: #4a5568;
            }
            .detail-value {
                color: #2d3748;
            }
            .amount {
                font-size: 24px;
                font-weight: bold;
                color: #48bb78;
            }
            .impact-section {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 25px;
                border-radius: 8px;
                margin: 25px 0;
                text-align: center;
            }
            .impact-title {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 15px;
            }
            .items-list {
                background: #f0fff4;
                padding: 15px;
                border-radius: 8px;
                margin: 15px 0;
                border-left: 4px solid #48bb78;
            }
            .items-title {
                font-weight: bold;
                color: #22543d;
                margin-bottom: 10px;
            }
            .item {
                padding: 5px 0;
                color: #2f855a;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e2e8f0;
                color: #718096;
                font-size: 14px;
            }
            .cta-button {
                display: inline-block;
                background: #48bb78;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                margin: 15px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🧥 ARMARIO SOLIDARIO</div>
                <div class="subtitle">Solidarity Wardrobe Initiative</div>
            </div>

            <h1 style="color: #2d3748; text-align: center; margin-bottom: 20px;">
                Thank you, ${donorName}! 🙏
            </h1>

            <p style="text-align: center; font-size: 16px; color: #4a5568; margin-bottom: 25px;">
                Your generous donation is making a real difference in building a more sustainable and caring fashion ecosystem.
            </p>

            <div class="donation-details">
                <div class="detail-row">
                    <span class="detail-label">Donation ID:</span>
                    <span class="detail-value">#${donation.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">${date}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Amount:</span>
                    <span class="detail-value amount">${amount}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Payment Method:</span>
                    <span class="detail-value">${donation.paymentMethod?.toUpperCase() || 'N/A'}</span>
                </div>
            </div>

            ${donation.clothingItems && donation.clothingItems.length > 0 ? `
            <div class="items-list">
                <div class="items-title">📦 Donated Items:</div>
                ${donation.clothingItems.map((item, index) => 
                    `<div class="item">${index + 1}. ${item.type || 'Item'} - ${item.brand || 'Unknown Brand'} (${item.condition || 'Good'})</div>`
                ).join('')}
            </div>
            ` : ''}

            <div class="impact-section">
                <div class="impact-title">🌟 Your Impact</div>
                <p>
                    Your donation helps provide clothing to those in need through our Solidarity Wardrobe.
                    Together, we're reducing fashion waste and supporting vulnerable communities.
                </p>
                <p style="margin-top: 15px; font-size: 14px; opacity: 0.9;">
                    Did you know? For every donation, we redistribute an average of 3 clothing items to families in need.
                </p>
            </div>

            <div style="text-align: center;">
                <a href="${process.env.BASE_URL || 'http://localhost:3002'}" class="cta-button">
                    Share Your Story 📢
                </a>
            </div>

            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2d3748; margin-top: 0;">📄 Receipt Attached</h3>
                <p style="margin-bottom: 0; color: #4a5568;">
                    Your official donation receipt is attached to this email. Please save it for your records.
                    This receipt may be used for tax deduction purposes - consult with your tax advisor.
                </p>
            </div>

            <div class="footer">
                <p>
                    <strong>Armario Solidario</strong><br>
                    Part of the AVBETOS Intelligence System<br>
                    🌐 <a href="https://tryonyou.app" style="color: #667eea;">www.tryonyou.app</a> | 
                    📧 <a href="mailto:donations@tryonyou.app" style="color: #667eea;">donations@tryonyou.app</a>
                </p>
                <p style="font-size: 12px; margin-top: 15px;">
                    This is an automated email. If you have any questions, please contact our support team.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}

async function sendWelcomeEmail(recipientEmail, donorName) {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Armario Solidario',
        address: process.env.SMTP_FROM || 'donations@tryonyou.app'
      },
      to: recipientEmail,
      subject: '👕 Welcome to Armario Solidario Community!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #667eea; text-align: center;">Welcome ${donorName}! 🎉</h1>
          <p>Thank you for joining the Armario Solidario community. Your commitment to sustainable fashion and social solidarity inspires us.</p>
          <p>You'll receive updates about the impact of your donations and opportunities to get more involved in our mission.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.BASE_URL || 'http://localhost:3002'}" style="background: #48bb78; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Make Another Donation</a>
          </div>
          <p style="color: #718096; font-size: 14px; text-align: center;">
            Armario Solidario - Building a better fashion future together
          </p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${recipientEmail}:`, result.messageId);
    
    return result;
  } catch (error) {
    console.error('Welcome email sending error:', error);
    throw new Error('Failed to send welcome email');
  }
}

module.exports = {
  sendReceiptEmail,
  sendWelcomeEmail
};