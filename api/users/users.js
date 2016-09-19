var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var jsend = require('jsend');

module.exports = {
    getUsers: function(event, context) {
        var params = {
            "TableName": "users",
        };
        docClient.scan(params, function(err, data) {
            context.succeed(jsend.fromArguments(err, data));
        });
    },
    getUser: function(event, context) {
        var params = {
            "TableName": "users",
            "Key": {
                "id": event.body.id,
            }
        };
        docClient.get(params, function(err, data) {
            context.succeed(jsend.fromArguments(err, data));
        });
    },
    createUser: function(event, context) {
        var datetime = new Date().getTime().toString();
        var item = event.body;
        item.lastUpdated = datetime;
        var params = {
            TableName: "users",
            Item: item
        };
        docClient.put(params, function(err, data) {
            context.succeed(jsend.fromArguments(err, data));
        });
    },
    getInterns: function(event, context) {
        var params = {
            TableName: "users",
            IndexName: "userStatusIndex",
            KeyConditionExpression: "#s = :status",
            ExpressionAttributeValues: {
                ":status": event.body.id
            },
            ExpressionAttributeNames: {
                "#s": "status"
            },
        };
        docClient.query(params, function(err, data) {
            context.succeed(jsend.fromArguments(err, data));
        });
    }
};
