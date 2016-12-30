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
    getUser: function(event, context ,params) {
        var param = {
            "TableName": "users",
            "Key": {
                "id": params.id,
            }
        };
        docClient.get(param, function(err, data) {
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
    getInterns: function(event, context, params) {
        var param = {
            TableName: "users",
            IndexName: "userStatusIndex",
            KeyConditionExpression: "#s = :status",
            ExpressionAttributeValues: {
                ":status": params.status
            },
            ExpressionAttributeNames: {
                "#s": "status"
            },
        };
        docClient.query(param, function(err, data) {
            context.succeed(jsend.fromArguments(err, data));
        });
    }
};
