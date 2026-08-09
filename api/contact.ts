import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Define the validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000)
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    // 1. Validate incoming data
    const validatedData = contactSchema.parse(req.body);

    // 2. Configure Nodemailer with Gmail OAuth2 (or standard SMTP)
    // The user mentioned OAuth2 in their prompt. This is the setup for it.
    // If they just use an App Password, it also works by replacing auth type.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER, // e.g., saimanjunath069@gmail.com
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      }
    });

    // 3. Define the email options
    const mailOptions = {
      from: `Portfolio Contact Form <${process.env.GMAIL_USER}>`,
      to: 'saimanjunath069@gmail.com',
      replyTo: validatedData.email,
      subject: `New Message from ${validatedData.name} (Portfolio)`,
      text: `
You have a new message from your portfolio contact form:

Name: ${validatedData.name}
Email: ${validatedData.email}

Message:
${validatedData.message}
      `,
      html: `
        <div style="font-family: sans-serif; max-w-lg; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <h3 style="color: #555;">Message:</h3>
          <p style="white-space: pre-wrap; color: #333; line-height: 1.5;">${validatedData.message}</p>
        </div>
      `
    };

    // 4. Send the email
    await transporter.sendMail(mailOptions);

    // 5. Return success
    return res.status(200).json({ success: true, message: 'Message sent successfully' });

  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
    }

    console.error('Email Dispatch Error:', error);
    // Return a generic error to the client to avoid leaking server info
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
}
