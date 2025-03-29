import { Router } from 'express';
import emailTemplateRouter from './emailTemplateRouter';
import apiRouter from './apiRouter';
import scrapersRouter from './scrapersRouter';
import emailRouter from './emailRouter';
import senderAuthenticationRouter from './SenderAuthenticationRouter';
import emailStatusRouter from './emailStatusRouter';




const router = Router();

router.use('/api', apiRouter);
router.use('/scrapers', scrapersRouter);
router.use('/emailTemplate', emailTemplateRouter);
router.use('/email',emailRouter);
router.use('/sender', senderAuthenticationRouter);
router.use('/emailStatus', emailStatusRouter);

export default router;












