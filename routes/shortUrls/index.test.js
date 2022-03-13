import request from 'supertest';
import app from '../../app';
import { fetchUrls, fetchByFullUrl } from '../../services/shortUrls';

jest.mock('../../services/shortUrls');

afterEach(() => {
  jest.restoreAllMocks();
});

const mockedUrl = {
  full: 'https://expressjs.com/en/guide/routing.html',
  short: 'tier.app-PFaLqVSwV',
};

describe('Routes', () => {
  describe('PATH - /shortUrls', () => {
    it('returns 200 for GET', async () => {
      fetchUrls.mockReturnValue(null);
      try {
        await request(app).get('/shortUrls');
      } catch (error) {
        expect(error).toEqual(null);
      }
    });

    it('returns 200 for POST', async () => {
      fetchByFullUrl.mockReturnValue(mockedUrl);
      try {
        await request(app).get('/shortUrls').send({ fullUrl: mockedUrl.full });
      } catch (error) {
        expect(error).toEqual(null);
      }
    });

    it('returns 405 for DELETE', async () => {
      try {
        await request(app).delete('/shortUrls');
      } catch (error) {
        expect(error.status).toEqual(405);
      }
    });

    it('returns 405 for PATCH', async () => {
      try {
        await request(app).patch('/shortUrls');
      } catch (error) {
        expect(error.status).toEqual(405);
      }
    });

    it('returns 405 for PUT', async () => {
      try {
        await request(app).put('/shortUrls');
      } catch (error) {
        expect(error.status).toEqual(405);
      }
    });
  });

  describe('PATH - /notImplemented', () => {
    it('returns 405 for GET', async () => {
      try {
        await request(app).get('/notImplemented');
      } catch (error) {
        expect(error.status).toEqual(405);
      }
    });
  });
});
