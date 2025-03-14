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
            const emailStatus = await Promise.all(
                clients.map(async (client) => {
                    const data = {
                        to: client.to,
                        from: sender,
                        templateId: templateId
                    };
                    return await sgMail.send(data);
                })
            );
            httpResponse(req, res, 200, 'The email has been delivered to all clients.', emailStatus);
            return;
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






