import request from 'supertest';
import app from '../../app';
import * as mockingoose from 'mockingoose';

import { ShortUrl } from '../../models/shortUrls';

afterEach(() => {
  mockingoose.resetAll();
});

const mockedUrl = {
  full: 'https://expressjs.com/en/guide/routing.html',
  short: 'tier.app-PFaLqVSwV',
};

describe('POST', () => {
  describe('when short url is already present', () => {
    it('returns 200 with url', async () => {
      expect.assertions(2);

      mockingoose(ShortUrl).toReturn(mockedUrl, 'findOne');

      const response = await request(app).post('/shortUrls').send({
        fullUrl: mockedUrl.full,
      });

      expect(response.statusCode).toEqual(200);
      expect(response.body).toMatchObject(mockedUrl);
    });
  });

  describe('when short url is not already present', () => {
    it('creates new url and returns 200 with message', async () => {
      expect.assertions(2);

      mockingoose(ShortUrl).toReturn(null, 'find');

      const response = await request(app).get('/shortUrls');

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({ message: 'No urls' });
    });
  });
});
