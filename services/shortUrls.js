import ShortUrl from '../models/shortUrls';

const fetchUrls = () => ShortUrl.find();

const fetchByShortUrl = (short) => ShortUrl.findOne({ short });

const fetchByFullUrl = (full) => ShortUrl.findOne({ full });

const createShortUrl = (full) => ShortUrl.create({ full });

const incrementClicks = (url) => {
  url.clicks++;
  url.save();
};

export {
  fetchUrls,
  fetchByShortUrl,
  fetchByFullUrl,
  createShortUrl,
  incrementClicks,
};
