import { resend } from '../lib/resend';
import VerificationEmail from '../../../emails/verificationEmail';
import type { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  if (!resend) {
    return {
      success: false,
      message: 'RESEND_API_KEY is not configured. Please add it to the environment.',
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Mystery Message Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    if (error) {
      console.error('Error sending verification email via Resend:', error);
      console.log(`\x1b[33m[DEV HELPER]\x1b[0m Verification code for ${email} is: \x1b[36m${verifyCode}\x1b[0m`);
      
      // Resend's onboarding@resend.dev free tier restricts sending emails to only the account owner's email.
      // In development mode, allow registration to succeed and log the verification OTP to terminal.
      if (process.env.NODE_ENV === 'development') {
        return {
          success: true,
          message: 'Verification code logged to server terminal (Resend Dev mode).',
        };
      }

      return { success: false, message: error.message || 'Failed to send verification email.' };
    }

    console.log('Verification email sent successfully:', data);
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    console.log(`\x1b[33m[DEV HELPER]\x1b[0m Verification code for ${email} is: \x1b[36m${verifyCode}\x1b[0m`);
    
    if (process.env.NODE_ENV === 'development') {
      return {
        success: true,
        message: 'Verification code logged to server terminal (Resend Dev mode).',
      };
    }

    return { success: false, message: 'Failed to send verification email.' };
  }
}