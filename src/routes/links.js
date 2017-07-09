const express = require('express');
const {isLoggedIn, isAuthorized} = require('../helpers/auth');
const Link = require('../models/Link');
const router = express.Router();

router.use(isLoggedIn);

router.get('/', function(req, res, next) {
    console.log(req.user);
    Link.
    find({owner: req.user._id}).
    exec(function (err, links) {
        if (err) return next(err);
        console.log(links);
        res.json({
            'code': 200,
            'links' : links 
        });
    });
});

router.post('/new', function(req, res, next) {
    const link = new Link({
        dest: req.body.dest,
        name: req.body.name,
        owner: req.user._id
    });

    link.save(function (err) {
        if (err) return next(err);
        res.json({
            'code': 200,
            'message' : 'Success',
            'description' : 'Link created'
        });
    });    
});

router.post('/update/:id', isAuthorized, function(req, res, next) {
    const updatedLink = {
        dest: req.body.dest,
        name: req.body.name,
        updatedAt: new Date() 
    };

    Link.update({_id: req.params.id}, updatedLink, function (err, output) {
        if (err) return next(err);
        console.log(output);
        const updated = output.n; 
        res.json({
            'code': 200,
            'message' : 'Success',
            'description' : (updated > 0) ? 'Link updated' : 'No link found'
        });
    });
});

router.get('/delete/:id', isAuthorized, function(req, res, next) {
    Link.remove({_id: req.params.id}, function (err, output) {
        if (err) return next(err);
        const deleted = output.result.n; 
        res.json({
            'code': 200,
            'message' : 'Success',
            'description' : (deleted > 0) ? 'Link deleted' : 'No link found'
        });
    });
});

module.exports = router;
