import validate from './validate';
import { createRequest, createResponse } from 'node-mocks-http';

let mockNext = jest.fn();
const mockRes = createResponse();

const error = (message, code) => {
  const err = new Error(message);
  err.status = code;

  return err;
};

afterEach(() => {
  mockNext = jest.fn();
});

describe('#validate', () => {
  describe('when req.body is empty', () => {
    const mockReq = createRequest({
      body: {},
    });

    it('returns 400 error', () => {
      validate(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        error('Request payload should include full Url', 400)
      );
    });
  });

  describe('Full url', () => {
    const fullUrls = {
      valid: [
        'https://imgs.xkcd.com/comics/false_dichotomy.png',
        'http://some-where.com/some-image.jpeg',
        'ftp://some-where.com/some-image.com',
        'https://some-where.com/some-where.com/some-where.com/some-where.com/some-where.com/some-image.avif',
      ],
      invalid: [
        '1234',
        'https:/some-where/some-image.com',
        'nowhere://some-where.com',
        'https//some-where.com//some-image',
      ],
    };

    describe('is valid', () => {
      fullUrls['valid'].forEach((fullUrl) => {
        it(`returns no error for ${fullUrl}`, () => {
          const mockReq = createRequest({
            body: {
              fullUrl,
            },
          });

          validate(mockReq, mockRes, mockNext);
          expect(mockNext).toHaveBeenCalledWith();
        });
      });
    });

    describe('is invalid', () => {
      fullUrls['invalid'].forEach((fullUrl) => {
        it(`returns error for ${fullUrl}`, () => {
          const mockReq = createRequest({
            body: {
              fullUrl,
            },
          });

          validate(mockReq, mockRes, mockNext);
          expect(mockNext).toHaveBeenCalledWith(
            error('Full url is invalid', 400)
          );
        });
      });
    });
  });
});
