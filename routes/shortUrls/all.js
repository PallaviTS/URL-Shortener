import { fetchUrls } from '../../services/shortUrls';

const allRouter = async (req, res, next) => {
  try {
    const shortUrls = await fetchUrls();

    if (shortUrls && shortUrls.length) {
      const response = shortUrls.map(({ full, short, clicks }) => ({
        full,
        short,
        clicks,
      }));

      return res.status(200).json(response);
    } else {
      return res.status(200).json({ message: 'No urls' });
    }
  } catch (error) {
    const err = new Error(`An error occurred in finding the urls: ${error}`);
    err.status = 500;
    return next(err);
  }
};

export default allRouter;
