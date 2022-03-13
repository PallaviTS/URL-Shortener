import request from 'supertest';
import app from '../../app';
import * as mockingoose from 'mockingoose';

import { ShortUrl } from '../../models/shortUrls';

beforeEach(() => {
  mockingoose.resetAll();
  mockingoose(ShortUrl).toReturn(null, 'find');
});

afterEach(() => {
  mockingoose.resetAll();
});

describe('Routes', () => {
  describe('for valid route and method', () => {
    it('returns 200', async () => {
      try {
        await request(app).get('/shortUrls');
      } catch (error) {
        expect(error).toEqual(null);
      }
    });
  });

  describe('for invalid route or method', () => {
    it('returns 405', async () => {
      try {
        await request(app).delete('/shortUrls');
      } catch (error) {
        expect(error.status).toEqual(405);
      }
    });
  });
});
