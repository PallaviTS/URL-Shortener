import { Router } from 'express';
import { handleNewFullUrl, fetchByFullUrl } from '../../services/shortUrls';

import validate from '../../middlewares/validate';

// postRouter which is specific to this route is used to chain up validate and creation handler functions
const postRouter = Router();

postRouter.use(validate);

// check if the short url exists, if not create new short url
postRouter.use(async (req, res, next) => {
  const { fullUrl } = req.body;
  try {
    const url = await fetchByFullUrl(fullUrl);

    if (url) {
      return res.status(200).json(url);
    }

    const newUrl = await handleNewFullUrl(fullUrl);
    return res.status(200).json(newUrl);
  } catch (error) {
    const err = new Error(`An error occurred in creating the url: ${error}`);
    err.status = 500;
    return next(err);
  }
});

export default postRouter;
