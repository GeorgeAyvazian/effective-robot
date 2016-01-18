var express = require('express');
var router = express.Router();
var io = require('../io');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

router.get('/api/v1/products/:discriminatorField/:discriminatorValue', (req, res, next) =>
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", (_, db) => {
        db.collection('products')
            .find(req.params.discriminatorField ? {[req.params.discriminatorField]: req.params.discriminatorValue} : {})
            .toArray((_, doc) => {
                res.json(doc);
                db.close();
            });
    })
);

router.delete('/api/v1/products', (req, res, next) =>
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", (_, db) => {
        db.collection('products')
            .findOneAndDelete({[req.body.discriminatorField]: req.body.discriminatorValue}, {w: 1}, () => {
                io.emit('delete:product', req.body);
                res.json(req.body);
                db.close()

            });
    })
);

router.post('/api/v1/products', (req, res, next) =>
    !req.body._id &&
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", (_, db) => {
        db.collection('products')
            .insert(req.body, {w: 1}, () => {
                io.emit('save:product', req.body);
                res.json(req.body);
                db.close();
            });
    })
);

router.put('/api/v1/products', (req, res, next) =>
    req.body._id &&
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", (_, db) => {
            db.collection('products')
            .update({'_id': ObjectID(req.body._id)}, {$set: {[req.body.changeField]: req.body.newValue}}, {w: 1}, () => {
                io.emit('update:product', req.body);
                res.json(req.body);
                db.close();
            });
    })
);

module.exports = router;
