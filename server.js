var express = require("express");
var app = express();
var path = require("path");
// var data = require("./database/database");
const User = require('./model')("User");
const branch = require('./model')("branches");
const catalog = require('./model')("catalog");
const debug = require("debug")("mongo:model-user");

app.set("view engine", 'ejs');

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + 'public/images'));




/////routers
var routUser = require('./routes/users');
app.use('/users', routUser);
var routIndex = require('./routes/index');
app.use('/index', routIndex);
var routBranch = require('./routes/branch');
app.use('/branch', routBranch);
var routCatalog = require('./routes/catalog');
app.use('/catalog', routCatalog);
////////////

app.get('/', function (req, res) {
    (async () => {
        // Inquire all the users at once and get it as an array
        try {
            let user = await User.GET();
            if(user.length==0)
            {
                let a = {type:"MANAGER",
                            username:"elia",
                            password:"123456",
                            flag:"1"};
                await User.CREATE(a);
            }
            let bra = await branch.GET();
            if(bra.length==0) {
                let b = {
                    src: "images/shop1.jpg",
                    name: "The Best Flowers",
                    address: "Jerusalem",
                    phone: "02-6542332"
                }
                let c = {
                    src: "images/shop2.jpg",
                    name: "ShoPlowers",
                    address: "Tel Aviv",
                    phone: "03-6542531"
                }
                await branch.CREATE(b);
                await branch.CREATE(c);
            }
        } catch (err) { debug(`Failed: ${err}`) }
    })();
    // res.render('index', {data:data});
    res.render('index', {});

});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/get_contact', function (req, res) {
    res.render('contactUs');
});

app.get('/get_about', function (req, res) {
    res.render('about_view');
});


app.listen(3000);
console.log("Running at Port 3000");