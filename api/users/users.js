var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    getUsers: function(event, context) {
        docClient.scan({
                TableName: "interns",
                Limit: 50
            },
            function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                    context.fail('ERROR: ' + err);
                } else {
                    var response = {};
                    response.records = [];
                    for (var i in data.Items) {
                        console.log(data.Items[i]);
                        response.records.push(data.Items[i]);
                    }
                    console.log(response);
                    context.succeed(response);
                }
            }
        );

    },

    getUser: function(event, context) {

        var params = {
            "TableName": "interns",
            "Key": {
                "id": event.body.id,
            }
        };

        console.log(event);
        docClient.get(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                context.fail(err);
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                console.log(data);
                context.succeed(data);
            }
        });
    },

    updateUser: function(event, context) {
        console.log(JSON.stringify(event, null, ' '));

        var params = {
            TableName: "interns",
            Key: {
                "id": event.body.id
            },
            UpdateExpression: "set firstname = :f, lastname= :l, fullname= :fn, nic= :nic, email= :e, mobile= :m, tel= :tel, address= :a, goals= :g, social= :s, techs= :t ",
            ExpressionAttributeValues: {
                ":f": event.body.firstname,
                ":l": event.body.lastname,
                ":fn": event.body.fullname,
                ":nic": event.body.nic,
                ":e": event.body.email,
                ":m": event.body.mobile,
                ":tel": event.body.tel,
                ":a": event.body.address,
                ":g": event.body.goals,
                ":s": event.body.social,
                ":t": event.body.techs

            },
            ReturnValues: "UPDATED_NEW"

        };

        var pf = function(err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                context.fail('ERROR: ' + err);
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                context.succeed('SUCCESS');
            }
        };

        docClient.update(params, pf);

    },

    createUser: function(event, context) {

        var datetime = new Date().getTime().toString();
        var params = {};
        params.TableName = "interns";
        params.Item = event.body;
        params.Item.lastUpdated = datetime;

        var pfunc = function(err, data) {
            if (err) {
                console.log(err, err.stack);
                context.fail('ERROR: ' + err);
            } else {
                context.succeed('SUCCESS');
            }
        };
        docClient.put(params, pfunc);
    }


};
