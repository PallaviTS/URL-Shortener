import request from 'supertest';
import app from '../../app';
import { fetchByFullUrl, handleNewFullUrl } from '../../services/shortUrls';

jest.mock('../../services/shortUrls');

afterEach(() => {
  jest.restoreAllMocks();
});

const mockedUrl = {
  full: 'https://expressjs.com/en/guide/routing.html',
  short: 'tier.app-PFaLqVSwV',
};

describe('POST', () => {
  describe('when short url is already present', () => {
    it('returns 200 with url', async () => {
      expect.assertions(2);

      fetchByFullUrl.mockReturnValue(mockedUrl);

      const response = await request(app).post('/shortUrls').send({
        fullUrl: mockedUrl.full,
      });

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(mockedUrl);
    });
  });

  describe('when short url is not already present', () => {
    it('creates new url and returns 200 with message', async () => {
      expect.assertions(2);

      fetchByFullUrl.mockReturnValue(null);
      handleNewFullUrl.mockReturnValue(mockedUrl);

      const response = await request(app).get('/shortUrls');

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({ message: 'No urls' });
    });
  });
});
