var express = require('express');
var router = express.Router();
var io = require('../io');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

router.get('/api/v1/products', function (req, res, next) {
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", function (err, db) {
        db.collection('products').find().toArray(function(err, docs) {
            res.json(docs);
        });
    });
});

router.delete('/api/v1/products', function (req, res, next) {
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", function (err, db) {
        req.body._id = ObjectID(req.body._id);
        db.collection('users').findOneAndDelete({_id: req.body._id}, {}, function () {
            console.log(arguments);
        });
    });

});

router.post('/api/v1/products', function (req, res, next) {
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", function (err, db) {
        db.collection('products').insert(req.body, {w: 1}, function (err, doc) {
            io.emit('save:product', req.body);
            res.json(req.body);
        });
    });
});

router.put('/api/v1/products', function (req, res, next) {
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", function (err, db) {
        db.collection('products').update({name: req.body.name}, {$set: {coll: req.body.coll}}, {w: 1}, function () {
            io.emit('save:product', req.body);
            res.json(req.body);
        });
    });
});


module.exports = router;
