import request from 'supertest';
import app from '../../app';
import { handleVisitToShortUrl } from '../../services/shortUrls';

jest.mock('../../services/shortUrls');

afterEach(() => {
  jest.restoreAllMocks();
});

const mockedData = {
  full: 'https://expressjs.com/en/guide/routing.html',
  short: 'tier.app-PFaLqVSwV',
};

describe('GET', () => {
  describe('when short url is present', () => {
    it('redirects to full url', async () => {
      expect.assertions(2);

      handleVisitToShortUrl.mockReturnValue(mockedData);

      const response = await request(app).get(`/shortUrls/${mockedData.short}`);

      expect(response.statusCode).toEqual(302);
      expect(response.text).toEqual(`Found. Redirecting to ${mockedData.full}`);
    });
  });

  describe('when short url is not present', () => {
    it('returns 404', async () => {
      expect.assertions(1);

      handleVisitToShortUrl.mockReturnValue(null);

      const response = await request(app).get(`/shortUrls/${mockedData.short}`);

      expect(response.statusCode).toEqual(404);
    });
  });
});
