// backend/utils/emailService.js
// ✅ UPDATED - Added separate end user verification email

const nodemailer = require('nodemailer');

let transporter = null;
let etherealFrom = 'no-reply@builderplatform.test';

async function getTransporter() {
  if (transporter) return transporter;

  try {
    if (process.env.NODE_ENV === 'production') {
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

    await transporter.verify();
    console.log('SMTP connection verified');

    return transporter;
  } catch (err) {
    console.error('Email transporter init failed:', err.message);
    throw err;
  }
}

// ═══════════════════════════════════════════════════════
// PLATFORM USER VERIFICATION EMAIL (Admin/Developer signup)
// ═══════════════════════════════════════════════════════
exports.sendVerificationEmail = async ({ to, name, verificationUrl }) => {
  try {
    const tp = await getTransporter();

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
          <p><strong>Next step:</strong> After verification, you'll be taken to the payment page to activate your account.</p>
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
      `
    };

    const info = await tp.sendMail(mailOptions);

    console.log('✅ Platform verification sent to:', to);
    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) {
      console.log('📬 Preview URL:', preview);
    }

  } catch (error) {
    console.error('❌ sendVerificationEmail failed:', error.message);
    if (error.code) console.error('Error code:', error.code);
    if (error.response) console.error('Response:', error.response);
    throw error;
  }
};

// ═══════════════════════════════════════════════════════
// END USER VERIFICATION EMAIL (Hotel guests, shoppers, etc.)
// ═══════════════════════════════════════════════════════
exports.sendEndUserVerificationEmail = async ({ to, name, verificationUrl, appName = 'HotelHub' }) => {
  try {
    const tp = await getTransporter();

    const mailOptions = {
      from: `"${appName}" <${etherealFrom}>`,
      to,
      subject: `Verify Your Email - ${appName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to ${appName}, ${name}!</h2>
          <p>Thank you for signing up. Please verify your email address to activate your account.</p>
          <p>
            <a href="${verificationUrl}" 
               style="background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Verify Email
            </a>
          </p>
          <p>Or copy this link: ${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p><strong>After verification,</strong> you can log in and start using ${appName}!</p>
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
      `
    };

    const info = await tp.sendMail(mailOptions);

    console.log('✅ End user verification sent to:', to);
    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) {
      console.log('📬 Preview URL:', preview);
    }

  } catch (error) {
    console.error('❌ sendEndUserVerificationEmail failed:', error.message);
    if (error.code) console.error('Error code:', error.code);
    if (error.response) console.error('Response:', error.response);
    throw error;
  }
};

// ═══════════════════════════════════════════════════════
// DEVELOPER INVITATION EMAIL
// ═══════════════════════════════════════════════════════
exports.sendDeveloperInvitation = async ({ to, organizationName, invitationUrl }) => {
  try {
    const tp = await getTransporter();

    const mailOptions = {
      from: `"BuilderPlatform" <${etherealFrom}>`,
      to,
      subject: `You've been invited to join ${organizationName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>You've been invited!</h2>
          <p><strong>${organizationName}</strong> has invited you to join their team as a developer on BuilderPlatform.</p>
          <p>
            <a href="${invitationUrl}" 
               style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Accept Invitation
            </a>
          </p>
          <p>Or copy this link: ${invitationUrl}</p>
          <p>This invitation will expire in 7 days.</p>
          <p>After accepting, you'll be able to access assigned projects and start building!</p>
        </div>
      `
    };

    const info = await tp.sendMail(mailOptions);
    
    console.log('✅ Invitation email sent to:', to);
    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) {
      console.log('📬 Preview URL:', preview);
    }

  } catch (error) {
    console.error('❌ sendDeveloperInvitation failed:', error.message);
    if (error.code) console.error('Error code:', error.code);
    if (error.response) console.error('Response:', error.response);
    throw error;
  }
};