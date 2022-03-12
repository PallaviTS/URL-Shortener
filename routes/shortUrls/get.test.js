import request from 'supertest';
import app from '../../app';
import * as mockingoose from 'mockingoose';

import ShortUrlModel from '../../models/shortUrls';

afterEach(() => {
  mockingoose.resetAll();
});

const data = {
  full: 'https://expressjs.com/en/guide/routing.html',
  short: 'tier.app-PFaLqVSwV',
  clicks: 0,
};

describe('GET', () => {
  describe('when short url is present', () => {
    it('redirects to full url', async () => {
      expect.assertions(2);

      mockingoose(ShortUrlModel).toReturn(data, 'findOne');

      const response = await request(app).get(`/shortUrls/${data.short}`);

      expect(response.statusCode).toEqual(302);
      expect(response.text).toEqual(`Found. Redirecting to ${data.full}`);
    });
  });

  describe('when short url is not present', () => {
    it('returns 404', async () => {
      expect.assertions(1);

      mockingoose(ShortUrlModel).toReturn(null, 'findOne');

      const response = await request(app).get(`/shortUrls/${data.short}`);

      expect(response.statusCode).toEqual(404);
    });
  });
});
