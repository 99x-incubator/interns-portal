var AWS =require('aws-sdk'),
dynamodbOfflineOptions={
  region: "localhost",
  endpoint:"http://localhost:8000"
};


var isOffline = function() {

  // set enviroment v for verstion 1

	return process.env.IS_OFFLINE;
};
module.exports.isOffline = isOffline;

var dynamodb={
  doc : isOffline() ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions): new AWS.DynamoDB.DocumentClient(),
  raw : isOffline() ? new AWS.DynamoDB(dynamodbOfflineOptions): new AWS.DynamoDB()
};

module.exports.dynamodb=dynamodb;


var dynamoTable =function(name){
  return 'intern'
};

module.exports.dynamoTable = dynamoTable;
