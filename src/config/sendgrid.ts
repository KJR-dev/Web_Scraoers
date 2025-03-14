import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

import sgMail from '@sendgrid/mail';
import sgClient from '@sendgrid/client';

// Set API key for both SendGrid services
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
sgClient.setApiKey(process.env.SENDGRID_API_KEY as string);

// ✅ Export both sgMail & sgClient correctly
export { sgMail, sgClient };
