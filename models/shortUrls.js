import { Schema, model } from 'mongoose';
import { generate } from 'shortid';

const shortUrlSchema = new Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: `tier.app-${generate()}`,
  },
});

const visitSchema = new Schema({
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  url: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'ShortUrl',
  },
});

// ShortUrl - collection to save every valid full URL with generated short URL
// Visit - collection to save every visit to short URL with visit counter

const Visit = model('Visit', visitSchema);
const ShortUrl = model('ShortUrl', shortUrlSchema);

export { Visit, ShortUrl };
