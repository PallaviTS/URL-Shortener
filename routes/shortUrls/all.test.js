import request from 'supertest';
import app from '../../app';
import * as mockingoose from 'mockingoose';

import ShortUrlModel from '../../models/shortUrls';

afterEach(() => {
  mockingoose.resetAll();
});

const mockedUrls = [
  {
    full: 'https://expressjs.com/en/guide/routing.html',
    short: 'tier.app-PFaLqVSwV',
    clicks: 0,
  },
  {
    full: 'https://expressjs.com/en/guide/routing.html',
    short: 'tier.app-PFaLqVSwV',
    clicks: 0,
  },
];

describe('GET', () => {
  describe('when short urls are present', () => {
    it('returns 200 with list of urls', async () => {
      expect.assertions(2);

      mockingoose(ShortUrlModel).toReturn(mockedUrls, 'find');

      const response = await request(app).get('/shortUrls');

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(mockedUrls);
    });
  });

  describe('when short urls are not present', () => {
    it('returns 200 with message', async () => {
      expect.assertions(2);

      mockingoose(ShortUrlModel).toReturn(null, 'find');

      const response = await request(app).get('/shortUrls');

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({ message: 'No urls' });
    });
  });
});
