const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator(value) {
        return EMAIL_PATTERN.test(value);
      },
      message: 'Please use valid email!',
    },
  },
  hashedPassword: { type: String, required: true },
  skills: {
    type: String,
    maxlength: [40, 'Skills Description must be at last 40 chars long!'],
  },
  myAds: { type: [ObjectId], ref: 'Ads' },
});

userSchema.index(
  { email: 1 },
  {
    unique: true,
    collation: {
      locale: 'en',
      strength: 2,
    },
  }
);

const User = model('User', userSchema);

module.exports = User;
