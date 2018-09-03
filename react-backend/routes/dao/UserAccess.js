let AWS = require('aws-sdk');
let md5 = require('md5');
let User = require('../models/User');

const ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', region: 'us-west-2' });
const TABLE_NAME = 'maries_blog_users';

class UserAccess
{

    createUser(ddbItem)
    {
        return new User(ddbItem.username, ddbItem.password);
    }

    /**
     * Gets a post by it's ID, Passes data to callback.
     * @param postId
     * @param callback
     */
    getUser(user, callback){
        let params = {
            TableName: TABLE_NAME,
            Key:{username: user.username}
        };

        // Call DynamoDB to read the item from the table
        ddb.get(params, function(err, data) {
            if (err) {
                console.log("Error", err);
                callback(err,null);
            } else {
                let user = this.createUser(data.Item)
                callback(null, user);
            }
        });
    }
}

module.exports = UserAccess;