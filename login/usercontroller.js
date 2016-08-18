var cognito_method = "";
var loggedIn = false;
var userName = "";
var userEmail = "";
var userImage = "";

var cognito_credentials= new AWS.CognitoIdentityCredentials({
       		IdentityPoolId: 'eu-west-1:8eea061c-2f4a-42b7-8d7d-',
       		RoleArn: 'arn:aws:iam::24323:role/',
	        AccountId: '798978779'
});

function userLoggedIn(providerName, token) {
  cognito_credentials.params.Logins = {};
  cognito_credentials.params.Logins[providerName] = token;
  cognito_credentials.expired = true;
  localStorage.setItem("loggedIn",loggedIn);
  localStorage.setItem("providerName",providerName);
  localStorage.setItem("token",token);
}

function getUser(){
  cognito_credentials.params.Logins = {};
  cognito_credentials.params.Logins[localStorage.getItem('providerName')] = localStorage.getItem('token');
  cognito_credentials.expired = true;

  loggedIn = localStorage.getItem('loggedIn');
  userName = localStorage.getItem('userName');
  userEmail = localStorage.getItem('userEmail');
  userImage = localStorage.getItem('userImage');
}

function setUserInformation(){
  localStorage.setItem("userName",userName);
  localStorage.setItem("userEmail",userEmail);
  localStorage.setItem("userImage",userImage);
}

