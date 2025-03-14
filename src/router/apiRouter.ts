import { Router } from 'express';
import apiController from '../controller/apiController';
import rateLimit from '../middleware/rateLimit';
import searchController from '../controller/searchController';

const apiRouter = Router();

apiRouter.route('/self').get(rateLimit(1), apiController.self);
apiRouter.route('/health').get(rateLimit(2), apiController.health);
apiRouter.route('/search').get(rateLimit(1), searchController.search);


export default apiRouter;






