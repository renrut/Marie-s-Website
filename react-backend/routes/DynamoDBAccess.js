var AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', region: 'us-west-2' });

let TABLE_NAME = 'maries_blog';

class DynamoDBAccess{

    getPost(postId, cb){
        if(postId === null){
            postId = "1d";
        }
        // Load the AWS SDK for Node.js
        // Set the region

        // Create the DynamoDB service object
        var params = {
            TableName: TABLE_NAME,
            Key:{postId: postId}
        };

        // Call DynamoDB to read the item from the table
        ddb.get(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success");
                cb(data);
            }
        });
    }

}

module.exports = DynamoDBAccess;