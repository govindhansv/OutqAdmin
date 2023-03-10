var express = require('express');
var router = express.Router();
const db = require('../connection');

/* GET home page. */

router.get('/', async function(req, res, next) {
    let user = null;
    if (req.session) {
        user = req.session.user
    }
    let stores = await db.get().collection('stores').find().toArray()
    let services = await db.get().collection('services').find().toArray()
    let users = await db.get().collection('users').find().toArray()
    let owners = await db.get().collection('owners').find().toArray()
    let orders = await db.get().collection('orders').find().toArray()

    res.render('index', { stores,services,users,owners,orders, user: user });
});

router.get('/clean', async function(req, res) {
    await db.get().collection('orders').remove()

    res.redirect('back');
});

module.exports = router;