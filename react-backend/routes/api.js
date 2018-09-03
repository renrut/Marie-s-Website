let express = require('express');
let router = express.Router();
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
let DynamoDBAccess = require('./dao/DynamoDBAccess');
let UserAccess = require('./dao/UserAccess');

passport.use(new LocalStrategy(
    function(username, password, done) {
        let userAccess = new UserAccess();

        userAccess.getUser({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    let userAccess = new UserAccess();

    userAccess.getUser({ username: username }, function(err, user) {
        done(err, user);
    });
});

/* GET blog. */
router.get('/post/:postId*?', function(req, res, ) {
    let postId = req.params.postId;
    getPublishedPost(postId, res);
});

/* POST blog. */
router.post('/post/:postId*?', function(req, res, ) {
    console.log("Called Post /post with id " + req.params.postId);
    //generatePost
    let postId = req.params.postId;
    savePost(postId, req.body, res);
});

router.post('/login', passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true }));




//TODO: Move into blog helper class
let getPublishedPost = function(postId, res)
{
    let ddbAccess = new DynamoDBAccess();
    let cb = returnPost.bind(null, res);

    if(!postId)
    {
        console.log("No id provided. Getting most recent published post.");
        ddbAccess.getRecentPublishedPost(cb);
    }
    else
    {
        passport.authenticate('local', function(err, user, info) {
            if (!user) {
                ddbAccess.getPost(postId, false, cb);

            }else{
                ddbAccess.getPost(postId, true, cb);
            }
        });
    }
};

let savePost = function(postId, body, res)
{
    console.log("\nBlog To Save");
    console.log(body);
    let ddbAccess = new DynamoDBAccess();

    let saveData = function (uniqueId) {
        let date = new Date().toISOString();

        let newPost = {
            postId: uniqueId.toString(),
            isPublished: body.publish,
            postTags: {},
            postDate:date,
            postText:body.postText,
            postTitle:body.postTitle,
        };
        console.log("\nSaving...");
        console.log(newPost);
        ddbAccess.savePost(newPost, function (err, data) {
            if(err)
            {
                res.status(err.statusCode).send(err.message);
            }else{
                res.status(200).send(newPost.postId);
            }
        });
    };

    if(!postId)
    {
        console.log("\nNo id provided. Generating post id.");
        //this could technically cause a race condition,
        // but not too worried since I only expect one poster.
        ddbAccess.getRecentPost(function (data) {
            let generatedPostId = parseInt(data.postId) + 1;
            saveData(generatedPostId)
        });
    }
    else
    {
        console.log("Saving post with id " + postId);
        saveData(postId)
    }
}


let returnPost = function(res, data)
{
    console.log(data);
    if(data){
        res.send(data);
    }else{
        res.sendStatus(404);
    }
}

module.exports = router;
