var express = require('express');
var router = express.Router();
const debug = require("debug")("mongo:model-user");
const User = require('../model')("User");
const index = require("./index");

router.get('/get_user', function (req, res) {
    let type = index.getUser().type;
    (async () => {
        // Inquire all the users at once and get it as an array
        try {
            users = await User.GET();
            // res.render('userList', [{user:users},{t:userlogedin.type}]);
            // res.render('userList',{a:users,b:userlogedin.type});
            res.render('userList',{a:users,b:type});
        } catch (err) {
            debug(`Failed: ${err}`)
        }
    })();
});

router.post('/add_user', function (req, res) {
    let user = req.body;
    let type = index.getUser().type;
    (async () => {
        // Inquire all the users at once and get it as an array
        try {
            await User.CREATE(user);
            users = await User.GET();
            res.render('userList',{a:users,b:type});
        } catch (err) { debug(`Failed: ${err}`) }
    })();
});


router.post('/remove_user', function (req, res) {
    let type = index.getUser().type;
    (async () => {
        // Inquire all the users at once and get it as an array
        try {
            // users = await User.GET();
            await User.REMOVE(req.body.id);
            users = await User.GET();
            // res.render('userList',users);
            res.render('userList',{a:users,b:type});
        } catch (err) { debug(`Failed: ${err}`) }
    })();
});

router.post('/promote_user', function (req, res) {
    // let id = JSON.stringify(req.body).id;
    let a = req.body.id;
    let type = index.getUser().type;
    (async () => {
        // Inquire all the users at once and get it as an array
        try {
            users = await User.GET();
            let b = findById(users,a);
            await User.PROMOTE(b);
            users = await User.GET();
            // res.render('userList', [{user:users},{t:userlogedin.type}]);
            res.render('userList',{a:users,b:type});
        } catch (err) {
            debug(`Failed: ${err}`)
        }
    })();
});

function findById(users,id) {
    let cUser = undefined;
    users.forEach(function (user) {
        if (user.id == id)
            cUser = user;
    });
    return cUser._doc;
}

module.exports = router;