var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    getAllActiveTask: function(event, context) {
        var params = {
            TableName: "config",
            Key: {
                "id": "activeTask",
            },
            ProjectionExpression: "Task"
        };

        docClient.get(params, function(err, data) {
            if (err)
                console.error(JSON.stringify(err, null, 2));
            else
                console.log(JSON.stringify(data, null, 2));
            context.succeed(data);
        });

    },

    getUserTask: function(event, context) {
        console.log(event.id);

        var params = {
            TableName: "interns",
            Key: {
                "id": event.body.id
            },
            ProjectionExpression: "Task"
        };

        docClient.get(params, function(err, data) {
            if (err)
                console.error("ERROR" + JSON.stringify(err, null, 2));
            else

                console.log("OK" + JSON.stringify(data, null, 2));
            context.succeed(data);
        });

    },

    updateTaskAdmin: function(event, context) {
        console.log(event.taskArray);
        var params = {
            TableName: "config",
            Key: {
                "id": "activeTask"
            },
            UpdateExpression: "SET Task = :Task",
            ExpressionAttributeValues: {
                ":Task": event.body.taskArray
            },
            ReturnValues: "ALL_NEW"
        };


        docClient.update(params, function(err, data) {
            if (err)
                console.error("ERROR" + JSON.stringify(err, null, 2));
            else
                console.log("OK" + JSON.stringify(data, null, 2));
            context.succeed(data);
        });

    },

    createTaskAdmin: function(event, context) {
        var params = {
            TableName: "config",
            Key: {
                "id": "activeTask",
            },
            ProjectionExpression: "Task"
        };

        var newTask = event.body.newTask;


        docClient.get(params, function(err, data) {
            if (err)
                console.log(JSON.stringify(err, null, 2));
            else
                data = data.Item.Task;
            data.push(newTask);

            console.log(JSON.stringify(data, null, 2));

            var params2 = {
                TableName: "config",
                Key: {
                    "id": "activeTask"
                },
                UpdateExpression: "SET Task = :Task",
                ExpressionAttributeValues: {
                    ":Task": data
                },
                ReturnValues: "ALL_NEW"
            };

            docClient.update(params2, function(err, data) {
                if (err)
                    console.log(JSON.stringify(err, null, 2));
                else
                    console.log(JSON.stringify(data, null, 2));
                context.succeed(data);
            });
        });


    },

    updateTaskUser: function(event, context) {
        var params = {
            TableName: "interns",
            Key: {
                "id": event.body.id
            },
            UpdateExpression: "SET Task = :Task",
            ExpressionAttributeValues: {
                ":Task": event.body.newTask
            },
            ReturnValues: "ALL_NEW"
        };

        docClient.update(params, function(err, data) {
            if (err)
                console.log(JSON.stringify(err, null, 2));
            else
                console.log(JSON.stringify(data, null, 2));
            context.succeed(data);
        });
    }

};
