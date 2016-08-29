'use strict';

const Promise = require('bluebird');
const DynamoDB = require('aws-sdk').DynamoDB;


const client = new DynamoDB.DocumentClient();

module.exports = (method, params) => {
    return Promise.fromCallback(cb => client[method](params, cb));
};
