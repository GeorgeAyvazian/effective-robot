var express = require('express');
var router = express.Router();
var io = require('../io');
var MongoClient = require('mongodb').MongoClient;

router.get('/api/v1/users', function (req, res, next) {
    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
        db.collection('users').find().toArray(function(err, docs) {
            res.json(docs);
        });
    });
});

router.post('/api/v1/users', function (req, res, next) {
    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
        db.collection('users').save(req.body, {}, function () {
            io.emit('save:user', req.body);
        });
    });
});

router.put('/api/v1/users', function (req, res, next) {
    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
        db.collection('users').save(req.body, {}, function () {
            io.emit('save:user', req.body);
        });
    });
});

router.delete('/api/v1/users', function (req, res, next) {
    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
        db.collection('users').findOneAndDelete({name: req.body.name}, {}, function () {
            console.log(arguments);
        });
    });
});

module.exports = router;
