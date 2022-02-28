const router = require('express').Router();
const { getAllAds, getFirstThree, getBySearch } = require('../service/ad');
const preload = require('../middleware/preLoad');
const mapErrors = require('../util/mappers');
const { isLoggedIn } = require('../middleware/guards');
const { getUserByEmail } = require('../service/user');

router.get('/', async (req, res) => {
  const ads = await getFirstThree();
  res.render('home', { title: 'Home', ads });
});

router.get('/ads', async (req, res) => {
  const ads = await getAllAds();
  res.render('ads', { title: 'All Ads', ads });
});

router.get('/ads/:id', preload(true), async (req, res) => {
  const ad = res.locals.ad;

  if (req.session.user) {
    ad.hasUser = true;
    ad.isOwner = req.session.user._id == ad.author._id;

    if (ad.applied.some((candidate) => candidate._id == req.session.user._id)) {
      ad.hasApplied = true;
    }
  }

  res.render('details', { title: `${ad.headline} Details` });
});

router.get('/search', isLoggedIn(), (req, res) => {
  res.render('search', { title: 'Search for a job' });
});

router.post('/search', isLoggedIn(), async (req, res) => {
  res.locals.hasSearched = true;
  const search = req.body.search.trim();
  const user = await getUserByEmail(search);

  try {
    const matches = await getBySearch(user._id);
    res.render('search', { title: 'Search for Offer', matches });
  } catch (err) {
    console.log(err);
    const errors = mapErrors(err);
    res.render('search', { title: 'Search for Offer', errors });
  }
});

module.exports = router;
