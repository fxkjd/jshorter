const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); 
const Link = require('../models/Link'); 
const unauthError = require('../../assets/errors/401.json');

module.exports = {
    isLoggedIn: function(req, res, next) {
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();
        // if they aren't redirect them to the home page
        res.status(401).json(unauthError);
    },
    isAuthorized: function(req, res, next) {
        Link.findById(req.params.id, function (err, link) { 
            if (err) return next(err);
            if (link && link.owner.equals(req.user._id)) {
                return next();
            } else {
                res.status(401).json(unauthError);
            }
        });
    },
    config: function(passport) {
        // Passport config
        passport.use(new LocalStrategy(User.authenticate()));
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
    }
}
