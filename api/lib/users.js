var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports ={
	getUsers : function(event){
		var datetime = new Date().getTime().toString();
    var params = {};
    params.TableName = "boilerplate-users-dev";
    params.Item = {
        "id": event.id,
        "username": event.username,
        
    };

    console.log(params.Item);

    var pfunc = function(err, data) {
        if (err) {
            console.log(err, err.stack);
            context.fail('ERROR: ' + err);
        } else {
            context.succeed('It worked!');
        }
    };

    docClient.put(params, pfunc);



	},
	getUser : function(){
		return {"nuwa":90};

	},
	postUsers : function(){
		return {"nuwa":90};

	},
	postUser : function(){
		return {"nuwa":90};

	}


};
