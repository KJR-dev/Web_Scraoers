import { Router } from 'express';
import emailTemplateRouter from './emailTemplateRouter';
import apiRouter from './apiRouter';
import scrapersRouter from './scrapersRouter';
import emailRouter from './emailRouter';




const router = Router();

router.use('/api', apiRouter);
router.use('/scrapers', scrapersRouter);
router.use('/emailTemplate', emailTemplateRouter);
router.use('/email',emailRouter)

export default router;









