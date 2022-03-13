import { fetchUrls } from '../../services/shortUrls';

const allRouter = async (req, res, next) => {
  try {
    const urls = await fetchUrls();

    if (urls && urls.length) {
      return res.status(200).json(urls);
    } else {
      return res.status(200).json({ message: 'No urls' });
    }
  } catch (error) {
    const err = new Error(`An error occurred in fetching the urls: ${error}`);
    err.status = 500;
    return next(err);
  }
};

export default allRouter;
