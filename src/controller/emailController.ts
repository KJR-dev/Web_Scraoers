import { NextFunction, Request, Response } from 'express';
import { sgMail } from '../config/sendgrid';
import httpError from '../util/httpError';
import logger from '../util/logger';
import httpResponse from '../util/httpResponse';
import { EmailSendData } from '../types/types';

export default {
    send: async (req: Request, res: Response, next: NextFunction) => {
        const { clients, sender, templateId } = req.body as EmailSendData;

        try {
            // Create an array of emails instead of using `personalizations`
            const emails = clients.map((client) => ({
                to: client.to, // SendGrid accepts a direct email string here
                from: sender,
                templateId: templateId,
                dynamicTemplateData: { url: client.url }
            }));

            // SendGrid's `send()` method accepts an array
            const emailStatus = await sgMail.send(emails);

            httpResponse(req, res, 200, 'The email has been delivered to all clients.', emailStatus);
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error('Error while sending emails:', error.message);
                httpError(next, error, req, 500);
            } else {
                logger.error('Unknown error occurred:', error);
                httpError(next, new Error('An unknown error occurred.'), req, 500);
            }
        }
    }
};

