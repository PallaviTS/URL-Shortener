import { Router } from 'express';

import postRouter from './post';
import allRouter from './all';
import getRouter from './get';

const router = Router();

router.get('/', allRouter);

router.post('/', postRouter);

router.get('/:shortUrl', getRouter);

export default router;
