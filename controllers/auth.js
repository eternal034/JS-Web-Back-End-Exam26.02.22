const { isLoggedIn, isGuest } = require('../middleware/guards');
const { register, login } = require('../service/user');
const mapErrors = require('../util/mappers');
const router = require('express').Router();

router.get('/register', isGuest(), (req, res) => {
  res.render('register', { title: 'Sign Up' });
});

router.post('/register', isGuest(), async (req, res) => {
  try {
    if (req.body.password.length < 5) {
      throw new Error('Password must be at least 5 chars long!');
    }
    if (req.body.password != req.body.repass) {
      throw new Error("Passwords don't match!");
    }
    const user = await register(
      req.body.email,
      req.body.password,
      req.body.skills
    );

    req.session.user = user;
    console.log(res.locals.hasUser);
    res.redirect('/');
  } catch (err) {
    console.log(err);
    const errors = mapErrors(err);
    res.render('register', { title: 'Sign Up', errors });
  }
});

router.get('/login', isGuest(), (req, res) => {
  res.render('login', { title: 'Sing In' });
});

router.post('/login', isGuest(), async (req, res) => {
  try {
    const user = await login(req.body.email, req.body.password);
    req.session.user = user;
    res.redirect('/');
  } catch (err) {
    console.log(err);
    const errors = mapErrors(err);
    res.render('login', { title: 'Sign In', errors });
  }
});

router.get('/logout', isLoggedIn(), (req, res) => {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;
