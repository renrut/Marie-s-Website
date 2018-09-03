let BlogPostValidator = require('../validator/BlogPostValidator')
let BlogPostHelper = require('../helpers/BlogPostHelper')
let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', region: 'us-west-2' });

let blogPostHelper = new BlogPostHelper();
const TABLE_NAME = 'maries_blog';

class DynamoDBAccess
{

    /**
     * Gets a post by it's ID, Passes data to callback.
     * @param postId
     * @param callback
     */
    getPost(postId, returnUnpublished, callback){
        let params = {
            TableName: TABLE_NAME,
            Key:{postId: postId}
        };

        // Call DynamoDB to read the item from the table
        ddb.get(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                if(data.Item.isPublished || returnUnpublished)
                {
                    callback(data.Item);
                }else {
                    callback(null);
                }
            }
        });
    }

    /**
     * Saves a post to the database, defaulting to unpublished.
     * @param post
     * @param callback
     */
    savePost(post, callback)
    {
        var params = {
            TableName: TABLE_NAME,
            Item: post
        };
        ddb.put(params, function(err, data) {
            if (err) {
                console.log("Error", err);
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    /**
     *
     * @param callback
     */
    getRecentPublishedPost(callback)
    {
        let cb = function (data) {
            if(data && data.length > 0)
            {
                callback(data[0]);
            }else{
                console.log("No data found.");
            }
        };

        this.getRecentPublishedPosts(1, cb);
    }

    /**
     * Gets the top n most recent posts. Unfortunately it uses a scan.
     * @param numPostsToRetrieve
     * @param callback
     */
    getRecentPublishedPosts(numPostsToRetrieve, callback)
    {
        let params = {
            TableName : TABLE_NAME,
            FilterExpression : 'isPublished = :published',
            ExpressionAttributeValues : {':published' : true},
        };
        ddb.scan(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                let posts = data.Items;
                blogPostHelper.sortPosts(posts);
                callback(posts.slice(0,numPostsToRetrieve));
            }
        });
    }
    /**
     *
     * @param callback
     */
    getRecentPost(callback)
    {
        let cb = function (data) {
            if(data && data.length > 0)
            {
                callback(data[0]);
            }else{
                console.log("No data found.");
            }
        };

        this.getRecentPosts(1, cb);
    }

    /**
     * Gets the top n most recent posts. Unfortunately it uses a scan.
     * @param numPostsToRetrieve
     * @param callback
     */
    getRecentPosts(numPostsToRetrieve, callback)
    {
        let params = {
            TableName : TABLE_NAME,
        };
        ddb.scan(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                let posts = data.Items;
                blogPostHelper.sortPosts(posts);
                callback(posts.slice(0,numPostsToRetrieve));
            }
        });
    }
}

module.exports = DynamoDBAccess;