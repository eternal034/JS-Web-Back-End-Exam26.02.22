const router = require('express').Router();

const { isLoggedIn, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preLoad');
const { createAd, editAd, deleteAd, apllyForJob } = require('../service/ad');
const mapErrors = require('../util/mappers');

router.get('/create', isLoggedIn(), (req, res) => {
  res.render('create', { title: 'Create Ad' });
});

router.post('/create', isLoggedIn(), async (req, res) => {
  const userId = req.session.user._id;
  const ad = {
    headline: req.body.headline,
    location: req.body.location,
    companyName: req.body.companyName,
    companyDescription: req.body.companyDescription,
    author: userId,
  };

  try {
    await createAd(ad);
    res.redirect('/ads');
  } catch (err) {
    console.log(err);
    const errors = mapErrors(err);
    res.render('create', { title: 'Create an Ad', data: ad, errors });
  }
});

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
  res.render('edit', { title: 'Edit Your Ad' });
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
  const adId = req.params.id;

  const ad = {
    headline: req.body.headline,
    location: req.body.location,
    companyName: req.body.companyName,
    companyDescription: req.body.companyDescription,
  };

  try {
    await editAd(adId, ad);
    res.redirect('/ads/' + adId);
  } catch (err) {
    console.log(err);
    const errors = mapErrors(err);
    ad._id = adId;
    res.render('edit', { title: 'Edit Your Ad', ad, errors });
  }
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
  const adId = req.params.id;
  await deleteAd(adId);
  res.redirect('/ads');
});

router.get('/apply/:id', isLoggedIn(), async (req, res) => {
  const adId = req.params.id;
  const userId = req.session.user._id;

  try {
    await apllyForJob(adId, userId);
  } catch (err) {
    console.error(err);
  } finally {
    res.redirect('/ads/' + adId);
  }
});

module.exports = router;
