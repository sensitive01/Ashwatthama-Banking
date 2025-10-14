const otpEmailTemplate = (firstName, otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset OTP</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #8B1538 0%, #C41E3A 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                Password Reset Request
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                Secure verification code for your account
              </p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <!-- Greeting -->
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333; line-height: 1.6;">
                Dear <strong>${firstName}</strong>,
              </p>

              <!-- Message -->
              <p style="margin: 0 0 25px 0; font-size: 15px; color: #555555; line-height: 1.6;">
                We received a request to reset your password. To proceed, please use the One-Time Password (OTP) below:
              </p>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px;">
                <tr>
                  <td align="center" style="padding: 30px 20px; background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%); border-radius: 10px; border: 2px dashed #C41E3A;">
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #666666; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                      Your OTP Code
                    </p>
                    <h2 style="margin: 0; font-size: 42px; color: #C41E3A; font-weight: 700; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                      ${otp}
                    </h2>
                  </td>
                </tr>
              </table>

              <!-- Expiry Warning -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="background-color: #FFF7ED; border-left: 4px solid #F59E0B; padding: 15px 20px; border-radius: 6px;">
                    <p style="margin: 0; font-size: 14px; color: #92400E; line-height: 1.6;">
                      ⏱️ <strong>Important:</strong> This OTP will expire in <strong>5 minutes</strong>. Please use it promptly.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Security Notice -->
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #555555; line-height: 1.6;">
                If you didn't request a password reset, please ignore this email or contact our support team immediately if you have concerns about your account security.
              </p>

              <!-- Divider -->
              <div style="height: 1px; background-color: #e5e5e5; margin: 30px 0;"></div>

              <!-- Footer Message -->
              <p style="margin: 0 0 8px 0; font-size: 15px; color: #333333;">
                Best regards,
              </p>
              <p style="margin: 0; font-size: 15px; color: #C41E3A; font-weight: 600;">
                Banking Security Team
              </p>
            </td>
          </tr>

          <!-- Security Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 25px 30px; border-top: 1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #6b7280; line-height: 1.6;">
                      🔒 This is an automated message from a secure system. Please do not reply to this email.
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                      © ${new Date().getFullYear()} Banking Services. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Disclaimer -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="margin-top: 20px;">
          <tr>
            <td style="text-align: center; padding: 0 20px;">
              <p style="margin: 0 0 15px 0; font-size: 12px; color: #9ca3af; line-height: 1.5;">
                This email was sent to you as part of your account security verification process.<br/>
                Never share your OTP with anyone, including bank employees.
              </p>
            </td>
          </tr>
        </table>

        <!-- Developer Credits -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px;">
          <tr>
            <td style="text-align: center; padding: 15px 20px; background-color: #ffffff; border-radius: 8px;">
              <p style="margin: 0; font-size: 11px; color: #6b7280; line-height: 1.5;">
                Designed and Developed by <a href="https://sensitive.co.in/" target="_blank" style="color: #C41E3A; text-decoration: none; font-weight: 600;">Sensitive Technologies</a>
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = {
  otpEmailTemplate,
};