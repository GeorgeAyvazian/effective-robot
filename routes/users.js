var express = require('express');
var router = express.Router();
var io = require('socket.io');
var MongoClient = require('mongodb').MongoClient;

router.get('/api/v1/users', function (req, res, next) {
    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
        db.collection('users').find({'aasf': {$exists: true}}).next(function (ignored, result) {
            res.json(result);
        });
    });
});

router.post('/api/v1/users', function (req, res, next) {
    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
        db.collection('users').save(req.body, {}, function () {
            console.log(arguments);
        });
    });
});

module.exports = router;
