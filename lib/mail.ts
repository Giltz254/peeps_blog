import { DEFAULT_WEBSITE_URL } from "@/constants";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const html = `
      <div style="font-family: Gelasio, serif; line-height: 1.6; color: black;">
        <header style="padding: 20px; text-align: center; background-color: #2563EB; color: white;">
          <h1>Confirmation Code</h1>
        </header>
        <main style="padding: 20px; color: #333;">
          <p>Hello,</p>
          <p>
            We received a request to generate a confirmation code for your account at JSPEEPS. If you did not make this request, you can ignore this email. Otherwise, use the code below to proceed:
          </p>
          <p style="text-align: center; color: #333;">
            <span style="display: inline-block; background-color: #2563EB; color: white; padding: 10px 20px; border-radius: 4px; font-size: 18px; letter-spacing: 2px;">
              ${token}
            </span>
          </p>
          <p>If you have any questions, feel free to
            <a href="mailto:support@jspeeps.com" style="color: #2563EB; text-decoration: none;">contact our support team</a>.
          </p>
          <p style="color: #333;">Best regards,</p>
          <p style="color: #333;">The JSPEEPS Team</p>
        </main>
        <footer style="background-color: #10B98126; padding: 10px; text-align: center; font-size: 12px;">
          <p style="color: #333;">
            If you did not request a confirmation code, please ignore this email or
            <a href="mailto:support@jspeeps.com" style="color: #2563EB; text-decoration: none;">contact support</a>.
          </p>
          <p style="color: #333;">&copy; ${new Date().getFullYear()} JSPEEPS. All rights reserved.</p>
        </footer>
      </div>
    `;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your JSPEEPS Confirmation Code",
    html: html,
  });
};
export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  firstName: string
) => {
  const resetLink = `${DEFAULT_WEBSITE_URL}/new-password?token=${token}`;
  const html = `
      <div style="font-family: Gelasio, serif; line-height: 1.6; color: black;">
        <header style="padding: 20px; text-align: center; background-color: #2563EB; color: white;">
          <h1>Password Reset Request</h1>
        </header>
        <main style="padding: 20px; color: #333;">
          <p>Hi ${firstName},</p>
          <p>
            We received a request to reset your password for your account at JSPEEPS. If you did not make this request, you can ignore this email. Otherwise, you can reset your password using the button below:
          </p>
          <p style="text-align: center; color: #333;">
            <a
              href="${resetLink}"
              style="display: inline-block; background-color: #2563EB; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;"
            >
              Reset Your Password
            </a>
          </p>
          <p>If the button above doesn't work, please copy and paste the following link into your web browser:</p>
          <p style="word-break: break-all; color: #2563EB;">${resetLink}</p>
          <p style="color: #333;">
            If you have any questions, feel free to
            <a href="mailto:support@jspeeps.com" style="color: #2563EB; text-decoration: none;">contact our support team</a>.
          </p>
          <p style="color: #333;">Best regards,</p>
          <p style="color: #333;">The JSPEEPS Team</p>
        </main>
        <footer style="background-color: #10B98126; padding: 10px; text-align: center; font-size: 12px;">
          <p style="color: #333;">
            If you did not request a password reset, please ignore this email or
            <a href="mailto:support@jspeeps.com" style="color: #2563EB; text-decoration: none;">contact support</a>.
          </p>
          <p style="color: #333;">&copy; ${new Date().getFullYear()} JSPEEPS. All rights reserved.</p>
        </footer>
      </div>
    `;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Password Reset Request for Your JSPEEPS Account",
    html: html,
  });
};
export const sendVerificationEmail = async (
  email: string,
  token: string,
  firstName: string
) => {
  const confirmLink = `${DEFAULT_WEBSITE_URL}/new-verification?token=${token}`;
  const html = `
    <div style="font-family: Gelasio, serif; line-height: 1.6; color: black;">
      <header style="padding: 20px; text-align: center; background-color: #2563EB; color: white;">
        <h1>Welcome to JSPEEPS, ${firstName}!</h1>
      </header>
      <main style="padding: 20px; color: #333;">
        <p>Hi ${firstName},</p>
        <p>
          Thank you for joining our community at JSPEEPS! We're excited to have you on board. To get started and
          gain full access to all our features, please confirm your email address by clicking the button below:
        </p>
        <p style="text-align: center; color: #333;">
          <a
            href="${confirmLink}"
            style="display: inline-block; background-color: #2563EB; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;"
          >
            Confirm Your Email
          </a>
        </p>
        <p>If the button above doesn't work, please copy and paste the following link into your web browser:</p>
        <p style="word-break: break-all; color: #2563EB;">${confirmLink}</p>
        <p style="color: #333;">
          We're thrilled to have you as part of our community and look forward to providing you with the best content and
          experiences.
        </p>
        <p style="color: #333;">Best regards,</p>
        <p style="color: #333;">The JSPEEPS Team</p>
      </main>
      <footer style="background-color: #10B98126; padding: 10px; text-align: center; font-size: 12px;">
        <p style="color: #333;">
          If you did not sign up for this account, please ignore this email or
          <a href="mailto:support@jspeeps.com" style="color: #2563EB; text-decoration: none;">contact support</a>.
        </p>
        <p style="color: #333;">&copy; ${new Date().getFullYear()} JSPEEPS. All rights reserved.</p>
      </footer>
    </div>
  `;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Welcome to JSPEEPS! Confirm Your Email to Start Exploring",
    html: html,
  });
};
export const sendProjectSubmissionEmail = async (
  clientEmail: string,
  body: string
) => {
  const html = `
        <div style="font-family: Gelasio, serif; line-height: 1.6; color: black;">
          <header style="padding: 20px; text-align: center; background-color: #10B981; color: white;">
            <h1>Project Submission</h1>
            <p>${clientEmail} </p>
          </header>
          <main style="padding: 20px; color: #333;">
            <p>Hello,</p>
            <p>We have received your project submission at JSPEEPS. Below is the summary of your project:</p>
            <p style="background-color: #F3F4F6; padding: 15px; border-radius: 4px; font-size: 16px; color: #333;">
              ${body}
            </p>
            <p>Our team will review your project and get back to you as soon as possible.</p>
            <p>If you have any questions, feel free to
              <a href="mailto:support@jspeeps.com" style="color: #10B981; text-decoration: none;">contact our support team</a>.
            </p>
            <p style="color: #333;">Best regards,</p>
            <p style="color: #333;">The JSPEEPS Team</p>
          </main>
          <footer style="background-color: #2563EB26; padding: 10px; text-align: center; font-size: 12px;">
            <p style="color: #333;">
              If you have any issues or need further assistance, please
              <a href="mailto:support@jspeeps.com" style="color: #10B981; text-decoration: none;">contact support</a>.
            </p>
            <p style="color: #333;">&copy; ${new Date().getFullYear()} JSPEEPS. All rights reserved.</p>
          </footer>
        </div>
      `;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "kiptoogodffrey68@gmail.com",
    subject: "Your Project Submission at JSPEEPS",
    html: html,
  });
};
