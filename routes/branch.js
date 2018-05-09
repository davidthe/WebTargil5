var express = require('express');
var router = express.Router();
const branch = require('../model')("branches");


router.get('/get_branch', function (req, res) {
    // res.render('branchesList');
    console.log("ganrate user list ");
    (async () => {
        // Inquire all the users at once and get it as an array
        try {
            branches = await branch.GET();
            //console.dir(users, { showHidden: true, colors: true });
            console.log(branches);
            res.render('branchesList',{a:branches});
        } catch (err) { debug(`Failed: ${err}`) }
    })();
});

router.post('/add_branch', function (req, res) {
    let abranch = req.body;
    (async () => {
        // Inquire all the users at once and get it as an array
        try {
            await branch.CREATE(abranch);
            branches = await branch.GET();
            res.render('branchesList',{a:branches});
        } catch (err) { debug(`Failed: ${err}`) }
    })();
});


module.exports = router;
