import { Router } from 'express';
import rateLimit from '../middleware/rateLimit';
import emailTemplateContriller from '../controller/emailTemplateContriller';

const emailTemplateRouter = Router();

emailTemplateRouter.route('/').post(rateLimit(1), emailTemplateContriller.create).get(rateLimit(1), emailTemplateContriller.getAll);

emailTemplateRouter
    .route('/:id')
    .get(rateLimit(1), emailTemplateContriller.get)
    .put(rateLimit(1), emailTemplateContriller.update)
    .delete(rateLimit(1), emailTemplateContriller.delete);

export default emailTemplateRouter;

