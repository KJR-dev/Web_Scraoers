import { NextFunction, Request, Response } from 'express';
import httpError from '../util/httpError';
import logger from '../util/logger';
import httpResponse from '../util/httpResponse';
import axios from 'axios';

export default {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await axios.get('https://api.sendgrid.com/v3/verified_senders', {
                headers: {
                    Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }); // Extract sender details

            httpResponse(req, res, 200, 'Fetch all sender authentication.', response.data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error('Error while Fetch all sender authentication:', error.message);
                httpError(next, error, req, 500);
            } else {
                logger.error('Unknown error occurred:', error);
                httpError(next, new Error('An unknown error occurred.'), req, 500);
            }
        }
    }
};




