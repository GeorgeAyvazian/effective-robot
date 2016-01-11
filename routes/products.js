var express = require('express');
var router = express.Router();
var io = require('../io');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

router.get('/api/v1/products', (req, res, next) =>
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", (err, db) => {
        db.collection('products').find().toArray((err, doc) => res.json(doc));
        db.close();
    })
);

router.delete('/api/v1/products', (req, res, next) =>
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", (err, db) => {
        req.body._id = ObjectID(req.body._id);
        db.collection('users').findOneAndDelete({_id: req.body._id}, {w: 1}, () => console.log(arguments));
        db.close();
    })
);

router.post('/api/v1/products', (req, res, next) =>
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", (err, db) => {
        db.collection('products').insert(req.body, {w: 1}, (err, result) => {
            io.emit('save:product', req.body);
            res.json(req.body);
        });
        db.close();
    })
);

router.put('/api/v1/products', (req, res, next) =>
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", (err, db) => {
        db.collection('products').update({[req.body.discriminatorField]: req.body.discriminatorValue}, {$set: {[req.body.changeField]: req.body.newValue}}, {w: 1}, () => {
            io.emit('update:product', req.body);
            res.json(req.body);
        });
        db.close();
    })
);

module.exports = router;
