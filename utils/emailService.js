// backend/utils/emailService.js

const nodemailer = require('nodemailer');

let transporter = null;
let etherealFrom = 'no-reply@builderplatform.test';

async function getTransporter() {
  if (transporter) return transporter;

  try {
    if (process.env.NODE_ENV === 'production') {
      // Real service later
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      etherealFrom = process.env.EMAIL_USER;
      console.log('Production email ready');
    } else {
      console.log('🧪 Creating Ethereal test account...');
      const testAccount = await nodemailer.createTestAccount();

      console.log('Ethereal credentials:');
      console.log('   User:', testAccount.user);
      console.log('   Pass:', testAccount.pass);

      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      etherealFrom = testAccount.user;
      console.log('✅ Ethereal ready');
    }

    // Quick connection check
    await transporter.verify();
    console.log('SMTP connection verified');

    return transporter;
  } catch (err) {
    console.error('Email transporter init failed:', err.message);
    throw err;
  }
}

exports.sendVerificationEmail = async ({ to, name, verificationUrl }) => {
  try {
    const tp = await getTransporter();  // ← ensures it's ready

    const mailOptions = {
      from: `"BuilderPlatform" <${etherealFrom}>`,
      to,
      subject: 'Verify Your Email - BuilderPlatform',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to BuilderPlatform, ${name}!</h2>
          <p>Thank you for signing up. Please verify your email address to continue.</p>
          <p>
            <a href="${verificationUrl}" 
               style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Verify Email
            </a>
          </p>
          <p>Or copy this link: ${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
      `
    };

    const info = await tp.sendMail(mailOptions);

    console.log('✅ Verification "sent" to:', to);
    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) {
      console.log('📬 Preview URL:', preview);
    } else {
      console.log('No preview URL generated (non-Ethereal transport?)');
    }

  } catch (error) {
    console.error('❌ sendVerificationEmail failed:', error.message);
    if (error.code) console.error('Error code:', error.code);
    if (error.response) console.error('Response:', error.response);
    throw error;
  }
};

// Do the same pattern for sendDeveloperInvitation if needed