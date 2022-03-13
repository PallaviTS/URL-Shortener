import { ShortUrl, Visit } from '../models/shortUrls';

// service with extracted functions that fetches data from DB

// fetch all urls with visit count
const fetchUrls = async () => {
  const visits = await Visit.find()
    .select('-_id -__v')
    .populate('url', '-_id -__v');

  return visits.map(({ count, url: { full, short } }) => {
    return { visitCount: count, full, short };
  });
};

const incrementVisits = async (shortUrl) => {
  const visit = await Visit.findOne({ url: shortUrl });
  visit.count++;
  visit.save();
};

// fetch and increment the visit count
const handleVisitToShortUrl = async (short) => {
  const shortUrl = await ShortUrl.findOne({ short });

  if (shortUrl) {
    await incrementVisits(shortUrl);

    return { full: shortUrl.full, short: shortUrl.short };
  }
};

const fetchByFullUrl = (full) => ShortUrl.findOne({ full }).select('-_id -__v');

const createVisit = async (shortUrl) => {
  await Visit.create({ url: shortUrl });
};

// create short url for given full url and create visit reference
const handleNewFullUrl = async (full) => {
  const shortUrl = await ShortUrl.create({ full });
  await createVisit(shortUrl);

  return { full: shortUrl.full, short: shortUrl.short };
};

export { fetchUrls, handleVisitToShortUrl, fetchByFullUrl, handleNewFullUrl };
