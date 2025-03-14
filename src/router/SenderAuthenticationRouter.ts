import { Router } from 'express';
import rateLimit from '../middleware/rateLimit';
import senderController from '../controller/senderController';

const senderAuthenticationRouter = Router();

senderAuthenticationRouter.route('/').get(rateLimit(1), senderController.getAll);

export default senderAuthenticationRouter;



