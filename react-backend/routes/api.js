var express = require('express');
var router = express.Router();
var DynamoDBAccess = require('./DynamoDBAccess');

/* GET users listing. */
router.get('/post/:postId', function(req, res, next) {
    let postId = req.params.postId;
    console.log("Called /post");
    let ddbAccess = new DynamoDBAccess();
    if(postId){
        ddbAccess.getPost(postId);
    }else{
        ddbAccess.getPost(null);
    }
    console.log("Called /post/" + req.params.postId)
    let testSend = {test:"testObject"+req.params.postId};
    res.send(testSend);
});

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
