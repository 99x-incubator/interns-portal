# interns-portal

[![Join the chat at https://gitter.im/99xt/interns-portal](https://gitter.im/99xt/interns-portal.svg)](https://gitter.im/99xt/interns-portal?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)


# Introduction 

Intern management portal frontend was developed using AngularJs and Backend was developed using aws services and serverless framework.

This is a web portal that visualize working period and feedback for interns


api - consists with the serverless code for aws lambda functions

web - consists with the client side of the application which was developed using angularJS

## Used Technologies
*1. Angularjs* (Frontend)

*2. Node.js* (Backend)

*3. AWS Lambda ( node.js 2.7)*

*4. AWS DynamoDB* (Dababase)

*4. AWS Cognito User Pool*

*5. Serverless Framework *






## Setup Development Environment in Local Machine
###1 Angular Client (Frontend)
For begin run the following commands in your terminal:

| **Step** | **Command** |**Description**|
|---|-------|------|
|  1.  | `git clone https://github.com/99xt/interns-portal.git` | clone intern-portal project |
|  2.  | `cd interns-portal\web` | move to angular client directory
|  3.  | `npm install` | install npm packages
|  4.  | `gulp serve` | run gulp server in local host

Now application is working on your local machine (http://localhost:3000)


###2. AWS Lambda Function ( Backend )


| **Step** |**Description**|
|---|------|
|  1.  |  install AWS CLI in your local machine. Use [this procedure](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)|
|  2.  |  configure AWS CLI . This is [a procedure] (http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
|  3.  | `npm install -g serverless@beta` This is [a detailed description](https://github.com/serverless/serverless/blob/master/docs/01-guide/01-installing-serverless.md) |
|  4.  | `cd interns-portal\api`  move to node.js lambda directory|
|  5.  | `serverless deploy`  Deploy AWS Lambda function|

### 3. Create and Configure Cognito UserPool
| **Step** |**Description**|
|---|------|
|  1.  | Create Cognito user Pool. Detailed description is [here](http://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html)|
| 2.   | Add Cognito Userpool Appclient id,client id and region to _ file


