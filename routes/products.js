var express = require('express');
var router = express.Router();
var io = require('../io');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

router.get('/api/v1/products', function (req, res, next) {
    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
        db.collection('products').find().toArray(function(err, docs) {
            res.json(docs);
        });
    });
});

router.delete('/api/v1/products', function (req, res, next) {
    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
        req.body._id = ObjectID(req.body._id);
        db.collection('users').findOneAndDelete({_id: req.body._id}, {}, function () {
            console.log(arguments);
        });
    });

});
router.post('/api/v1/products', function (req, res, next) {
    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
        req.body._id = ObjectID(req.body._id);
        db.collection('products').save(req.body, {}, function () {
            io.emit('save:product', req.body);
        });
    });
});


module.exports = router;
