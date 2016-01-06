var express = require('express');
var router = express.Router();
var io = require('../io');
var MongoClient = require('mongodb').MongoClient;

router.get('/api/v1/invoices', function (req, res, next) {
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", function (err, db) {
        db.collection('invoices').find().toArray(function(err, docs) {
            res.json(docs);
        });
    });
});

router.post('/api/v1/invoices', function (req, res, next) {
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", function (err, db) {
        db.collection('invoices').save(req.body, {}, function () {
            io.emit('save:invoice', req.body);
        });
    });
});


module.exports = router;
