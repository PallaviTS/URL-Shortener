import { Router } from 'express';

import postRouter from './post';
import allRouter from './all';
import getRouter from './get';

const router = Router();

// to create short url
router.post('/', postRouter);

// to fetch full url by given short url
router.get('/:shortUrl', getRouter);

// to show all urls with visits count
router.get('/', allRouter);

export default router;
