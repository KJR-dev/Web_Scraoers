import { NextFunction, Request, Response } from 'express';
import httpResponse from '../util/httpResponse';
import httpError from '../util/httpError';
import logger from '../util/logger';
import { csvToJSONConvert } from '../util/csvToJson';

export default {
    getAllBounce: (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.file) {
                return httpError(next, new Error('No file uploaded'), req, 400);
            }
            const jsonData = csvToJSONConvert(req.file);
            httpResponse(req, res, 200, 'The email has been delivered to all clients.', jsonData);
        } catch (error) {
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




