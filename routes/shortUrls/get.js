import { handleVisitToShortUrl } from '../../services/shortUrls';

// check if the short url exists, if not return 404
const getRouter = async (req, res, next) => {
  const { shortUrl } = req.params;

  try {
    const url = await handleVisitToShortUrl(shortUrl);
    if (!url) return res.status(404).json({ message: `${shortUrl} Not found` });

    return res.redirect(url.full);
  } catch (error) {
    const err = new Error(`An error occurred in finding ${shortUrl}: ${error}`);
    err.status = 500;
    return next(err);
  }
};

export default getRouter;
