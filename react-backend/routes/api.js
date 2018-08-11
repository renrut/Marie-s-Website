let express = require('express');
let router = express.Router();
let DynamoDBAccess = require('./dao/DynamoDBAccess');

/* GET blog. */
router.get('/post/:postId*?', function(req, res, ) {
    console.log("Called Get /post");
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
        console.log("Getting post with id " + postId);
        ddbAccess.getPost(postId, false, cb);
    }
}

let savePost = function(postId, body, res)
{
    console.log("\nBlog To Save");
    console.log(body);
    let ddbAccess = new DynamoDBAccess();

    let saveData = function (generatedPostId) {
        let date = new Date().toISOString();

        let newPost = {
            postId: generatedPostId.toString(),
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
                res.sendStatus(200);
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
