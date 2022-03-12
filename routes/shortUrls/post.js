import { Router } from 'express';
import { createShortUrl, fetchByFullUrl } from '../../services/shortUrls';

import validate from '../../middlewares/validate';

const postRouter = Router();

postRouter.use(validate);

postRouter.use(async (req, res, next) => {
  const { fullUrl } = req.body;
  try {
    const url = await fetchByFullUrl(fullUrl);

    if (url) {
      return res
        .status(200)
        .json({ full: url.full, short: url.short, clicks: url.clicks });
    }

    const newUrl = await createShortUrl(fullUrl);
    return res.status(200).json({ full: newUrl.full, short: newUrl.short });
  } catch (error) {
    const err = new Error(`An error occurred in creating the url: ${error}`);
    err.status = 500;
    return next(err);
  }
});

export default postRouter;
