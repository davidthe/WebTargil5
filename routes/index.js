var express = require('express');
var router = express.Router();
var userlogedin = undefined;
// module.exports = {userlogedin};
const User = require('../model')("User");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function (req,res) {
    (async () => {
        // Inquire all the users at once and get it as an array
        try {
            // users = await userController.getList();
            users = await User.GET();

            currentUser = getUser(users,req);
            if (currentUser) // login ok
            {
                res.send(currentUser);

                // res.render('addUser',{a:userlogedin.type});

            }
            else // login error
                res.send("BAD");
        } catch (err) {
            debug(`Failed: ${err}`)
        }
    })();
});

function getUser(users,req) {
    let username = req.body.username;
    let pass = req.body.pass;
    let cUser = undefined;
    users.forEach(function (user) {
        if (user.username == username)
            if (user.password == pass&&user.flag==1) {
                cUser = user;
                userlogedin = user;
            }
    });
    return cUser;
}

router.getUser = function () {
    return userlogedin._doc;
}

module.exports = router;
