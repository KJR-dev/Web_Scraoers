import { Router } from 'express';
import rateLimit from '../middleware/rateLimit';
import searchController from '../controller/searchController';

const scrapersRouter = Router();

scrapersRouter.route('/search').get(rateLimit(1), searchController.search);

export default scrapersRouter;



