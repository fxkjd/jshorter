const express = require('express');
const passport = require('passport');
const auth = require('../helpers/auth');
const User = require('../models/User');
const router = express.Router();

router.get('/', auth.isLoggedIn, function(req, res, next) {
    res.json({
        'code': 200,
        'message' : 'Logged in',
        'description' : req.user
    });
});

router.get('/invalid', function(req, res, next) {
    res.status(401).json({
        'code': 401,
        'message' : 'Invalid',
        'description' : 'Invalid user credentials'
    });
});

router.post('/login', 
    passport.authenticate('local', { 
        successRedirect: '/users', 
        failureRedirect: '/users/invalid'
    })
);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/register', function(req, res, next) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            return next(err);
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/users');
        });
    });
});

module.exports = router;
