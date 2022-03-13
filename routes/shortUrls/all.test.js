import request from 'supertest';
import app from '../../app';
import { fetchUrls } from '../../services/shortUrls';

jest.mock('../../services/shortUrls');

afterEach(() => {
  jest.restoreAllMocks();
});

const mockedVisits = [
  {
    visitCount: 1,
    full: 'https://www.monkeyuser.com/2019/bug-fixing-ways/1',
    short: 'tier.app-ST7xZpprI',
  },
  {
    visitCount: 1,
    full: 'https://www.monkeyuser.com/2019/bug-fixing-ways/1',
    short: 'tier.app-ST7xZpprI',
  },
];

describe('GET', () => {
  describe('when short urls are present', () => {
    it('returns 200 with list of urls', async () => {
      expect.assertions(2);

      fetchUrls.mockReturnValue(mockedVisits);
      const response = await request(app).get('/shortUrls');

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(mockedVisits);
    });
  });

  describe('when short urls are not present', () => {
    it('returns 200 with message', async () => {
      expect.assertions(2);

      fetchUrls.mockReturnValue(null);

      const response = await request(app).get('/shortUrls');

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({ message: 'No urls' });
    });
  });
});
