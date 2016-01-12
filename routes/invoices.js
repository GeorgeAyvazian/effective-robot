var express = require('express');
var router = express.Router();
var io = require('../io');
var MongoClient = require('mongodb').MongoClient;

router.get('/api/v1/invoices/:discriminatorField/:discriminatorValue', (req, res, next) =>
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", (_, db) => {
        db.collection('invoices')
            .find(req.params.discriminatorField ? {[req.params.discriminatorField]: req.params.discriminatorValue} : {})
            .toArray((_, doc) => {
                res.json(doc);
                db.close();
            });
    })
);

router.delete('/api/v1/invoices', (req, res, next) =>
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", (_, db) => {
        db.collection('invoices').findOneAndDelete({[req.body.discriminatorField]: req.body.discriminatorValue}, {w: 1}, () => {
            io.emit('delete:invoice', req.body);
            res.json(req.body);
            db.close();
        });
    })
);

router.post('/api/v1/invoices', (req, res, next) =>
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", (_, db) => {
        db.collection('invoices').insert(req.body, {w: 1}, () => {
            io.emit('save:invoice', req.body);
            res.json(req.body);
            db.close();
        });
    })
);

router.put('/api/v1/invoices', (req, res, next) =>
    MongoClient.connect("mongodb://test:test@ds039095.mongolab.com:39095/heroku_vt7zk583", (_, db) => {
        db.collection('invoices').update({[req.body.discriminatorField]: req.body.discriminatorValue}, {$set: {[req.body.changeField]: req.body.newValue}}, {w: 1}, () => {
            io.emit('update:invoice', req.body);
            res.json(req.body);
            db.close();
        });
    })
);

module.exports = router;
