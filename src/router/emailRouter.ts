import { Router } from 'express';
import rateLimit from '../middleware/rateLimit';
import emailController from '../controller/emailController';

const emailRouter = Router();

emailRouter.route('/').post(rateLimit(1),emailController.send);

export default emailRouter;