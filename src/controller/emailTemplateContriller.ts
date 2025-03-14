import { NextFunction, Request, Response } from 'express';
import httpError from '../util/httpError';
import { CreateSendGridTemplate, SendGridTemplate } from '../types/types';
import { sgClient } from '../config/sendgrid';
import httpResponse from '../util/httpResponse';
import logger from '../util/logger';

export default {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { templateName, subject, htmlContent, plainTextContent, version = 1 } = req.body as CreateSendGridTemplate;
            const request = {
                method: 'POST' as 'post',
                url: '/v3/templates',
                body: {
                    name: templateName,
                    generation: 'dynamic'
                }
            };
            const [response] = await sgClient.request(request);

            const template = response.body as SendGridTemplate;

            if (!template) {
                logger.error('No templates found.', template);
                throw new Error('No templates found.');
            }

            // Step 2: Add a version with HTML content
            const addVersionRequest = {
                method: 'POST' as 'post',
                url: `/v3/templates/${template.id}/versions`, // Use the correct template ID
                body: {
                    template_id: template.id, // Ensure template_id is set correctly
                    name: `${template.name}`,
                    subject: subject,
                    html_content: htmlContent,
                    plain_content: plainTextContent,
                    active: version // Set as active version
                }
            };

            const [finalResponse] = await sgClient.request(addVersionRequest);
            httpResponse(req, res, 200, `${templateName} template Created`, finalResponse.body);
            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error('Error while create template:', error.message);
                httpError(next, error, req, 500);
            } else {
                logger.error('Unknown error occurred:', error);
                httpError(next, new Error('An unknown error occurred.'), req, 500);
            }
        }
    },

    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const request = {
                method: 'GET' as 'get',
                url: '/v3/templates?generations=dynamic'
            };
            const [response] = await sgClient.request(request);
            httpResponse(req, res, 200, `All template fetch successfully`, response.body);
            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error('Error while extracting all template:', error.message);
                httpError(next, error, req, 500);
            } else {
                logger.error('Unknown error occurred:', error);
                httpError(next, new Error('An unknown error occurred.'), req, 500);
            }
        }
    },

    get: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const request = {
                method: 'Get' as 'get',
                url: `/v3/templates/${id}`
            };

            const [response] = await sgClient.request(request);
            httpResponse(req, res, response.statusCode, `Template deleted successfully`, response.body);
            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error('Error while extracting template:', error.message);
                httpError(next, error, req, 500);
            } else {
                logger.error('Unknown error occurred:', error);
                httpError(next, new Error('An unknown error occurred.'), req, 500);
            }
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const request = {
                method: 'DELETE' as 'delete',
                url: `/v3/templates/${id}`
            };

            const [response] = await sgClient.request(request);
            httpResponse(req, res, response.statusCode, `Template deleted successfully`, response.body);
            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error('Error while delete template:', error.message);
                httpError(next, error, req, 500);
            } else {
                logger.error('Unknown error occurred:', error);
                httpError(next, new Error('An unknown error occurred.'), req, 500);
            }
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params; // Template ID
            const { templateName, subject, htmlContent, plainTextContent } = req.body as CreateSendGridTemplate;

            const updateTemplateRequest = {
                method: 'PATCH' as 'patch',
                url: `/v3/templates/${id}`,
                body: { name: templateName }
            };
            await sgClient.request(updateTemplateRequest);

            const [templateResponse] = await sgClient.request({
                method: 'GET',
                url: `/v3/templates/${id}`
            });
            const template = templateResponse.body as SendGridTemplate;

            if (!template.versions) {
                logger.error('No versions found for this template.', template);
                httpResponse(req, res, templateResponse.statusCode, 'No versions found for this template.', template);
                return;
            }

            const versionId = template.versions[0].id; // Get the first (active) version

            // Step 3: Update Template Version (Content, Subject, etc.)
            const updateVersionRequest = {
                method: 'PATCH' as 'patch',
                url: `/v3/templates/${id}/versions/${versionId}`,
                body: {
                    templateName, // Version Name (same as template name)
                    subject,
                    html_content: htmlContent,
                    plain_content: plainTextContent,
                    active: 1 // Keep it active
                }
            };
            const [updateVersionResponse] = await sgClient.request(updateVersionRequest);
            httpResponse(req, res, updateVersionResponse.statusCode, `Template deleted successfully`, updateVersionResponse.body);
            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error('Error while update template:', error.message);
                httpError(next, error, req, 500);
            } else {
                logger.error('Unknown error occurred:', error);
                httpError(next, new Error('An unknown error occurred.'), req, 500);
            }
        }
    }
};

