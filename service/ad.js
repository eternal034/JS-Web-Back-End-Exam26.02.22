const Ad = require('../models/Ad');
const User = require('../models/User');

async function getAllAds() {
  return Ad.find({}).lean();
}

async function getFirstThree() {
  return Ad.find().sort({ $natural: -1 }).limit(3).lean();
}

async function getAdById(adId) {
  return Ad.findById(adId).lean();
}

async function getAdAndUsers(adId) {
  return Ad.findById(adId)
    .populate('author', 'email')
    .populate('applied', 'email skills')
    .lean();
}

async function getBySearch(userId) {
  return Ad.find({ author: userId }).lean();
}

async function createAd(ad) {
  const result = new Ad(ad);

  await result.save();
}

async function editAd(adId, ad) {
  const adToEdit = await Ad.findById(adId);

  adToEdit.headline = ad.headline;
  adToEdit.location = ad.location;
  adToEdit.companyName = ad.companyName;
  adToEdit.companyDescription = ad.companyDescription;

  await adToEdit.save();
}

async function deleteAd(adId) {
  await Ad.findByIdAndDelete(adId);
}

async function apllyForJob(adId, userId) {
  const jobToApplyFor = await Ad.findById(adId);

  if (jobToApplyFor.applied.includes(userId)) {
    throw new Error('Already applied!');
  }

  jobToApplyFor.applied.push(userId);
  await jobToApplyFor.save();
}

module.exports = {
  getAllAds,
  getFirstThree,
  getAdById,
  getAdAndUsers,
  getBySearch,
  createAd,
  editAd,
  deleteAd,
  apllyForJob,
};
