let express = require('express');
let app = express();
let path = require('path');
let fs = require('fs')
let url = require('url')
let http = require('http')
let https = require('https')
let mkdirp = require('mkdirp')

let multer = require('multer');
let router = express.Router();
const catalog = require('../model')("catalog");

router.get('/get_catalog', function (req, res) {
    // res.render('flowersCatalog');
    (async () => {
        // Inquire all the users at once and get it as an array
        try {
            catalogs = await catalog.GET();
            res.render('flowersCatalog',{a:catalogs});
        } catch (err) {
            debug(`Failed: ${err}`)
        }
    })();
});


router.post('/add_catalog', function (req, res) {
    let acatalog = req.body;
    (async () => {
        // Inquire all the users at once and get it as an array
        try {
            await catalog.CREATE(acatalog);
            catalogs = await catalog.REQUEST();
            res.render('flowersCatalog',{a:catalogs});
        } catch (err) { debug(`Failed: ${err}`) }
    })();
});


router.post('/upload', function(req, res) {
    try {
        console.log("server-upload");
        console.log(req.headers);
        console.log(req.body);
        var fbytes = req.headers["content-length"];
        var fname = req.headers["x_filename"];
        var upbytes = 0;
        var pathFile = "public/images/" + fname;
        newfile = fs.createWriteStream(pathFile);
        req.on('data', function (stuff) {
            upbytes += stuff.length;
            var progress = (upbytes / fbytes) * 100;
            console.log("progress: " + parseInt(progress, 10) + "%\n");
            var good = newfile.write(stuff);
            if (!good) {
                console.log("Pause");
                req.pause();
            }
        });
        newfile.on('drain', function () {
            req.resume();
            console.log("Resume");
        });
        req.on('end', function (stuff) {
            res.end();
            console.log("Uploaded");
            newfile.end();
        });
    }catch (Ex)
    {
        console.log("ex "+Ex);
    }
});

router.post('/addFlowerIImgUrl', function(req, res) {
    console.log("server-addFlower");
    //הורדת הקובץ
    var imgUrl = req.body.imgUrl;
    var options = {
        directory: './public/images/',
        filename: req.body.name + '.png'
    };
    download(imgUrl, options, function (err) {
        console.log(1111111)
        if (err){
            console.log("image downloaded");
            res.status(500).send(err);
        }
        else {
            res.status(200).send();
        }
    });

});


function download(file, options, callback) {
    if (!file) throw("Need a file url to download")

    if (!callback && typeof options === 'function') {
        callback = options
    }

    options = typeof options === 'object' ? options : {}
    options.timeout = options.timeout || 20000
    options.directory = options.directory ? options.directory : '.'

    var uri = file.split('/')
    options.filename = options.filename || uri[uri.length - 1]

    var path = options.directory + "/" + options.filename

    if (url.parse(file).protocol === null) {
        file = 'http://' + file
        req = http
    } else if (url.parse(file).protocol === 'https:') {
        req = https
    } else {
        req = http
    }

    var request = req.get(file, function(response) {

        if (response.statusCode === 200) {

            mkdirp(options.directory, function(err) {
                if (err) throw err
                var file = fs.createWriteStream(path)
                response.pipe(file)
            })

        } else {

            if (callback) callback(response.statusCode)

        }

        response.on("end", function(){
            if (callback) callback(false, path)
        })

        request.setTimeout(options.timeout, function () {
            request.abort()
            callback("Timeout")
        })

    }).on('error', function(e) {

        if (callback) callback(e)

    })

}



module.exports = router;


