const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const adSchema = new Schema({
  headline: {
    type: String,
    minlength: [4, 'Headline must be at least 4 chars long!'],
  },
  location: {
    type: String,
    minlength: [8, 'Location must be at least 8 chars long!'],
  },
  companyName: {
    type: String,
    minlength: [3, 'Company name must be at least 3 chars long!'],
  },
  companyDescription: {
    type: String,
    maxlength: [40, 'Company name must be at last 40 chars long!'],
  },
  author: { type: ObjectId, ref: 'User' },
  applied: { type: [ObjectId], ref: 'User' },
});

const Ad = model('Ad', adSchema);

module.exports = Ad;
