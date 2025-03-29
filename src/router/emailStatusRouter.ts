import { Router } from 'express';
import rateLimit from '../middleware/rateLimit';
import emailStatusController from '../controller/emailStatusController';
import { upload } from '../middleware/upload';

const emailStatusRouter = Router();

emailStatusRouter.route('/bounce').post(rateLimit(1), upload.single('csvFile'), emailStatusController.getAllBounce);

export default emailStatusRouter;

