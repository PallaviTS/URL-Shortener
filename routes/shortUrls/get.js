import { fetchByShortUrl, incrementClicks } from '../../services/shortUrls';

const getRouter = async (req, res, next) => {
  const { shortUrl } = req.params;

  try {
    const url = await fetchByShortUrl(shortUrl);
    if (!url) return res.status(404).json({ message: `${shortUrl} Not found` });

    incrementClicks(url);

    return res.redirect(url.full);
  } catch (error) {
    const err = new Error(`An error occurred in finding ${shortUrl}: ${error}`);
    err.status = 500;
    return next(err);
  }
};

export default getRouter;
