var express = require('express');
var router = express.Router();
var slide = require('../lib/slide.js');

/* GET home page. */
router.get('/', function(req, res) {
    if(!req.query.url){
        res.render('default', { title: 'Demo' });
    } else {
        slide(req.query.url,function(err,img){
            res.render('index', {
                title: 'Present',
                url: img.url
            })
        })
    }
});

module.exports = router;
