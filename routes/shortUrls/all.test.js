import request from 'supertest';
import app from '../../app';
import * as mockingoose from 'mockingoose';

import { Visit } from '../../models/shortUrls';

afterEach(() => {
  mockingoose.resetAll();
});

const mockedVisits = [
  {
    count: 2,
    url: {
      full: 'https://www.monkeyuser.com/2019/bug-fixing-ways/1',
      short: 'tier.app-atrrKwWfW',
    },
  },
  {
    count: 0,
    url: {
      full: 'https://www.monkeyuser.com/2019/bug-fixing-ways/2',
      short: 'tier.app-atrrKwWfW',
    },
  },
];

describe('GET', () => {
  describe('when short urls are present', () => {
    it('returns 200 with list of urls', async () => {
      expect.assertions(3);

      mockingoose(Visit).toReturn(mockedVisits, 'find');

      const response = await request(app).get('/shortUrls');

      expect(response.statusCode).toEqual(200);
      expect(response.body[0]).toMatchObject({ count: mockedVisits[0].count });
      expect(response.body[1]).toMatchObject({ count: mockedVisits[1].count });
    });
  });

  describe('when short urls are not present', () => {
    it('returns 200 with message', async () => {
      expect.assertions(2);

      mockingoose(Visit).toReturn(null, 'find');

      const response = await request(app).get('/shortUrls');

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({ message: 'No urls' });
    });
  });
});
