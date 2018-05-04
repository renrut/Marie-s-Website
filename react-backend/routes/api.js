var express = require('express');
var router = express.Router();
var DynamoDBAccess = require('./DynamoDBAccess');

/* GET users listing. */
router.get('/post/:postId', function(req, res, next) {
    let postId = req.params.postId;
    console.log("Called /post");
    let ddbAccess = new DynamoDBAccess();
    let post = null;

    if(!postId){
        postId = "1d"
    }

    let cb = returnPost.bind(null, res);
    ddbAccess.getPost(postId, cb);

});

let returnPost = function(res, data)
{
    console.log(res)
    res.send(data.Item);
}

// /* POST users listing. */
// router.get('/post', function(req, res, next) {
//     console.log("Called /post");
//     let testSend = {
//         postTitle:"Post Title",
//         postText:"Lorem ipsum dolor sit amet, etiam viderer nec ea. Duo ne solet inciderint. Mei agam velit elaboraret no, te modus vivendum vis. Qui no everti aliquando, duis iudico apeirian te pro. Vis ei suas cetero persecuti.\n"
//     };
//     res.send(testSend);
// });

module.exports = router;
