const express = require('express');
const winston = require('winston');
const Link = require('../models/Link');
const notFound = require('../../assets/errors/404.json');
const router = express.Router();

router.get('/:link', function(req, res, next) {
    Link.findOne({name: req.params.link}, function (err, link) { 
        if (err) return next(err);
        if (link && link.dest){
            winston.log('debug', `Redirecting to ${link.dest}`);
            return res.redirect(link.dest);
        } else {
            res.status(404).json(notFound);
        }
    });
});

module.exports = router;
