var express = require('express');
var router = express.Router();
var io = require('../io');
var MongoClient = require('mongodb').MongoClient;

router.get('/api/v1/invoices', function (req, res, next) {
    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
        db.collection('invoices').find().toArray(function(err, docs) {
            res.json(docs);
        });
    });
});

router.post('/api/v1/invoices', function (req, res, next) {
    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
        db.collection('invoices').save(req.body, {}, function () {
            io.emit('save:invoice', req.body);
        });
    });
});


module.exports = router;
