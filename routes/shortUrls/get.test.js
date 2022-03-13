import request from 'supertest';
import app from '../../app';

import mongoose from 'mongoose';
import * as mockingoose from 'mockingoose';

const ObjectId = mongoose.Types.ObjectId;

import { ShortUrl, Visit } from '../../models/shortUrls';

afterEach(() => {
  mockingoose.resetAll();
});

const shortUrlData = {
  full: 'https://expressjs.com/en/guide/routing.html',
  short: 'tier.app-PFaLqVSwV',
  _id: ObjectId('609269995b2e888426d019ef'),
};

const visitData = {
  count: 1,
  url: {
    ...shortUrlData,
  },
};

describe('GET', () => {
  describe('when short url is present', () => {
    it('redirects to full url', async () => {
      expect.assertions(2);

      mockingoose(ShortUrl).toReturn(shortUrlData, 'findOne');
      mockingoose(Visit).toReturn(visitData, 'findOne');

      const response = await request(app).get(
        `/shortUrls/${shortUrlData.short}`
      );

      expect(response.statusCode).toEqual(302);
      expect(response.text).toEqual(
        `Found. Redirecting to ${shortUrlData.full}`
      );
    });
  });

  describe('when short url is not present', () => {
    it('returns 404', async () => {
      expect.assertions(1);

      mockingoose(ShortUrl).toReturn(null, 'findOne');

      const response = await request(app).get(
        `/shortUrls/${shortUrlData.short}`
      );

      expect(response.statusCode).toEqual(404);
    });
  });
});
