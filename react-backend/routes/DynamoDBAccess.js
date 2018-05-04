var AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });

let TABLE_NAME = 'marie_blog';

class DynamoDBAccess{



    getPost(postId){
        console.log("Calling "+TABLE_NAME);
        if(postId === null){
            postId = 1;
        }
        // Load the AWS SDK for Node.js
        // Set the region

        // Create the DynamoDB service object
        var params = {
            TableName: TABLE_NAME,
            Key: {
                S:{postId: "1"}
            }
        };

        // Call DynamoDB to read the item from the table
        ddb.get(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.Item);
            }
        });
        console.log("Calling ddb");
    }
}

module.exports = DynamoDBAccess;