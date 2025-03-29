import { NextFunction, Request, Response } from 'express';
import { sgMail } from '../config/sendgrid';
import type { MailDataRequired } from '@sendgrid/mail';
import httpError from '../util/httpError';
import logger from '../util/logger';
import httpResponse from '../util/httpResponse';
import { EmailSendData } from '../types/types';
import { EmailDetails } from '../constant/emails';

export default {
    send: async (req: Request, res: Response, next: NextFunction) => {
        const { clients, sender, templateId } = req.body as EmailSendData;

        try {
            // Construct the personalizations array for bulk sending
            const personalizations = clients.map((client) => ({
                to: [{ email: client.to }], // Each recipient gets its own object
                dynamic_template_data: { url: client.url }
            }));

            // SendGrid bulk email request
            const msg: MailDataRequired = {
                from: {
                    email: EmailDetails[sender]?.email || sender,
                    name: EmailDetails[sender]?.name || sender.split('@')[0]
                },
                templateId: templateId,
                personalizations,
                asm: {
                    groupId: 28003
                }
            };

            // SendGrid's send() method now receives a SINGLE request
            const emailStatus = await sgMail.send(msg);

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














