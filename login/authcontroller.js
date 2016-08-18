var auth = angular.module('auth', ['ngRoute']);


auth.controller('authCtrl', ['$scope', '$http', '$location',function($scope, $http,$location){
	$scope.loading = true;
	$scope.showRegisterForm = false;
	$scope.showNewRegisterForm = false;
	$scope.loadingAfterReg =false;
	$scope.emailVerified=false;
	$scope.emailVerifyFail=false;
	$scope.registerSuccess=false;
	$scope.loadingVerification= false;
	$scope.loginProcessing = false;
	$scope.loginFailed =false;

	AWS.config.region = 'eu-west-1'; 
	AWS.config.credentials = cognito_credentials;

    AWSCognito.config.region = 'eu-west-1';
    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-1:8eea061c-2f4a-42b7-8d7d-',
        RoleArn: 'arn:aws:iam::047541586413:role/',
        AccountId: ''
    });

	AWSCognito.config.credentials.get(function (err) {
        if (err) {
            console.log(err);
        }
    });

    var cognitoidentity = new AWS.CognitoIdentity();
   
    var poolData = { 
		UserPoolId : 'eu-west-',
        ClientId : 'hgg235532',
        Paranoia: 7
    };

	var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

	var verifyCode= $location.search().verify;
	var userCode= $location.search().user;

	// Verifiy new User 
	if(verifyCode != undefined && userCode != undefined ){

		$scope.loadingVerification = true;
		var userData = {
	        Username : userCode,
	        Pool : userPool
	    };

		var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
	  
	    cognitoUser.confirmRegistration(verifyCode, true, function(err, result) {
	      	$scope.loadingVerification = false;
	        if (err) {
	            $scope.emailVerifyFail=true;
	            $scope.emailVerifyFailedMessaged=err['message'];
	            $scope.$apply();
	            return;
	        }
	        $scope.emailVerified= true;
	        $scope.$apply();

	    });
	}

	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	function statusChangeCallback(response) {
		if (response.status === 'connected') {

			loggedIn = true;

	        userLoggedIn('graph.facebook.com',   response.authResponse.accessToken)
	        cognito_method = "Facebook";
	     	

	    	AWS.config.credentials.get(function(err) {
	    		if (!err) {

   	    	        $scope.apigClient = apigClientFactory.newClient({
	    	        	accessKey: AWS.config.credentials.data.Credentials.AccessKeyId,
	    	        	secretKey: AWS.config.credentials.data.Credentials.SecretAccessKey,
	    	        	sessionToken: AWS.config.credentials.data.Credentials.SessionToken,
	    	        	region: 'eu-west-1' 
	    	        });

	    	        var params = {};
	    	        var body = {};
	    	        var additionalParams = {};

	    	        $scope.apigClient.tenantCheckGet(params, body, additionalParams)
	    	        .then(function(result){
	    	        	if (!result.data) {
	    	        		var url = '/' + response.authResponse.userID + '?fields=name,email';
	    	        		FB.api(url, function(res) {
								$scope.name = res.name;
								
								$scope.email = res.email;
								
								userName=  res.name;
								userEmail = res.email;

								url = '/' + response.authResponse.userID + '/picture?type=normal'; 
							    FB.api(url, function(response) {
									$scope.pictureURL = response.data.url;
									userImage = response.data.url;
									setUserInformation();

									$scope.$apply();

									$scope.loading = false;
		    	        			$scope.showRegisterForm = true;
		    	        			$scope.$apply();
							    });
								setUserInformation();

						    });
	    	        	} else {
	    	        		var url = '/' + response.authResponse.userID + '?fields=name,email';
	    	        		FB.api(url, function(res) {
								
								userName=  res.name;
								userEmail = res.email;

								url = '/' + response.authResponse.userID + '/picture?type=normal'; 
							    FB.api(url, function(response) {									
									userImage = response.data.url;

									 setUserInformation();

	    	        				window.location.replace("http://earnsharkbeta.com.s3-website-eu-west-1.amazonaws.com");

							    });

							   
						    });
	    	        	}
	    	        }).catch( function(result){
	    	        	console.log(result);
	    	        });
	    	    }
	    	});

		} else if (response.status === 'not_authorized') {
	    	// The person is logged into Facebook, but not your app.
	    	$scope.loading = false;
	    	$scope.showRegisterForm = false;
	    	$scope.$apply();
		} else {
		    // The person is not logged into Facebook, so we're not sure if
		    // they are logged into this app or not.
		    $scope.loading = false;
		    $scope.showRegisterForm = false;
		    $scope.$apply();
		}
	}

	$scope.login = function () {
		$scope.loading = true;
		FB.login(function(response) {
		    statusChangeCallback(response);
		}, {scope: 'email', return_scopes: true});
	}
	
	$scope.loginForm = function () {
		$scope.loading = true;
		$scope.loginProcessing = true;

		console.log($scope.email+" "+$scope.password);

		    var authenticationData = {
		        Username : $scope.email,
		        Password : $scope.password,
		    };
		    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
		    
		    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
		    var userData = {
		        Username : $scope.email,
		        Pool : userPool
		    };
		    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
		    cognitoUser.authenticateUser(authenticationDetails, {
		        onSuccess: function (result) {
		            console.log('access token + ' + result.getAccessToken().getJwtToken());
		            loginAuthenticate(cognitoUser);
		        },

		        onFailure: function(err) {
		        	$scope.loginProcessing = false;

		        	$scope.loginFailed=true;
		        	$scope.loginFailedMessage=err["message"];
		        	$scope.$apply();
		           // alert(err);	
		        },

		    });

	}

	function loginAuthenticate(cognitoUser) {

	    if (cognitoUser != null) {
	        cognitoUser.getSession(function(err, result) {
	            if (result) {
	                console.log('You are now logged in.');

	                console.log(result)

	                loggedIn = true;

	                userLoggedIn('cognito-idp.eu-west-1.amazonaws.com/eu-west-fg23',  result.getIdToken().getJwtToken())

	                cognito_method = "Userpool";


	                console.log(cognito_credentials);


	                AWS.config.credentials.get(function(err) {
	                    if (!err) {
	                        console.log(AWS.config.credentials);

	                        $scope.apigClient = apigClientFactory.newClient({
	                            accessKey: AWS.config.credentials.data.Credentials.AccessKeyId,
	                            secretKey: AWS.config.credentials.data.Credentials.SecretAccessKey,
	                            sessionToken: AWS.config.credentials.data.Credentials.SessionToken,
	                            region: 'eu-west-1'
	                        });

	                        var params = {};
	                        var body = {};
	                        var additionalParams = {};

	                        $scope.apigClient.tenantCheckGet(params, body, additionalParams)
	                            .then(function(result) {
	                            		cognitoUser.getUserAttributes(function(err, resultUser) {
	                            			console.log(resultUser);

	                            			 for (i = 0; i < resultUser.length; i++) {
									          
									            if(resultUser[i].getName() =="name")
									       			userName=  resultUser[i].getValue();
									       		if(resultUser[i].getName() =="email")
									       			userEmail=  resultUser[i].getValue();
									       		if(resultUser[i].getName() =="picture")
									       			userImage=  resultUser[i].getValue();
									        }
	                                       									
											setUserInformation();
											if (!result.data) {
		                                    	console.log();
			                                    $scope.name = userName;
			                                    $scope.email = userEmail;
			                                    $scope.pictureURL = userImage;

			                                    $scope.$apply();

			                                   	$scope.loading = false;
			                                    $scope.showRegisterForm = true;
			                                    $scope.$apply();

			                                } else {
                                               window.location.replace("http://earnsharkbeta.com.s3-website-eu-west-1.amazonaws.com");
			                                }
	                                    });

	                                
	                            }).catch(function(result) {
	                                console.log(result);
	                            });
	                    }
	                });
	            }
	        });
	    }

	}

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '22532233532',
            cookie     : true,
			version    : 'v2.5'
		});

		FB.getLoginStatus(function(response) {
			statusChangeCallback(response);
		});
	};

	// Validate password for new Registration form
	$scope.$watch("passwordRegConfirm",
		function( newValue, oldValue ) {
			if($scope.passwordReg != newValue){
				$scope.newRegisterMessage = "Passwords do not match!";
			}
			else if($scope.passwordReg == newValue){
				$scope.newRegisterMessage="";
				var _upperLetters = /[A-Z]+/.test(newValue);
				var _lowerLetters = /[a-z]+/.test(newValue);
				if(newValue!=undefined){
					if(!(newValue.length >=6))
						$scope.newRegisterMessage += "Password Length should be greater than 6. ";
					if(!(_upperLetters))
						$scope.newRegisterMessage += "Use atleast 1 uppercase letter for password. ";
					if(!(_lowerLetters))
						$scope.newRegisterMessage += "Use atleast 1 lowercase letter for password. ";
				}
			}
			else if($scope.passwordReg == newValue && validPassword(newValue) ){
				$scope.newRegisterMessage= "";
			}

			if($scope.newRegisterMessage==""){
				$scope.newUser.passwordRegConfirm.$setValidity("",true);
				$scope.newUser.passwordReg.$setValidity("",true);
			}else{
				$scope.newUser.passwordRegConfirm.$setValidity("",false);				
				$scope.newUser.passwordReg.$setValidity("",false);				
			}
		}
	);

	// Register new Cognito User in Pool
	$scope.registerNewUser = function () {
		
		$scope.loadingAfterReg =true;
	    
	    var attributeList = [];	    
	    var dataEmail = {
	        Name : 'email',
	        Value : $scope.newEmail
	    };
	    var dataName = {
	        Name : 'name',
	        Value : $scope.newName
	    };
	     var dataImage = {
	        Name : 'picture',
	        Value : 'testin'
	    };
	    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
	    var attributeName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataName);
	    var attributepic = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataImage);

	    attributeList.push(attributeEmail);
	    attributeList.push(attributeName);
	    attributeList.push(attributepic);
	   

		userPool.signUp($scope.newEmail, $scope.passwordRegConfirm, attributeList, null, function(err, result){
	      
	        if (err) {
	        	console.log(err);
	        	$scope.loadingAfterReg =false;
	   			$scope.registerError= "Sorry! Something went wrong."+err['message'];
	   			$scope.$apply();

	            return;
	        }
	        cognitoUser = result.user;
	      	$scope.loadingAfterReg =false;
	      	$scope.registeredEmail=cognitoUser.getUsername();
	      	$scope.registerSuccess=true;
			$scope.$apply();
	        console.log('user name is ' + cognitoUser.getUsername());

	    });
	}

	function getHashValue(str){
	    var hash = 0;
	    if (str.length == 0) return hash;
	    for (i = 0; i < str.length; i++) {
	        char = str.charCodeAt(i);
	        hash = ((hash<<5)-hash)+char;
	        hash = hash & hash; // Convert to 32bit integer
	    }

	    var accId = "Acc"+hash;
	    return accId;
	}

	function getCurrentDateInString(){
		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    if(dd<10){
	        dd='0'+dd
	    } 
	    if(mm<10){
	        mm='0'+mm
	    } 
	    var today = mm+'/'+dd+'/'+yyyy;
 		
 		return today;
 	}

	function validPassword(password){
		var _upperLetters = /[A-Z]+/.test(password);
		var _lowerLetters = /[a-z]+/.test(password);
		if(password.length >=6 && _upperLetters && _lowerLetters)
			return true;
		return false;
	}	
	
	$scope.registerTenant = function () {
		$scope.loading = true;

		var params = {};
        var additionalParams = {};
		var body = {
			org : $scope.org,
			name : $scope.name,
			email : $scope.email
		}

		$scope.apigClient.tenantCreatePost(params, body, additionalParams).then(
			function(result){
				// window.location.replace("http://web.cubeframework.com.s3-website-us-east-1.amazonaws.com");

 				var createSubsUrl = "https://app.earnshark.com/prod/product/1/addsubscriptionfromapi?key=8ced94ca5c8d3cc2c19359540d3b5682d9efddf981854975e195ca096126f970a3cf8b41421512ecf1e751e1284bb9a1";	
                
                var accID = getHashValue($scope.name + new Date().getTime());
                // console.log(accID);

				var body = {
				    "account":{
				        "name":$scope.name,
				        "email":$scope.email,
				        "accountID":accID,
                        "start_date": getCurrentDateInString()
				    },
				    "license_id":1,
				    "enableNotifications" : true,
				    "sendInvoiceNow" : true
				};

				$http.post(createSubsUrl, body).success(function(data, status) {
					console.log("Posted Subscription Successfully ......... ");
		            console.log(data);

		            window.location.href = "http://earnsharkbeta.com.s3-website-eu-west-1.amazonaws.com"; 

		            // window.location.replace("http://web.cubeframework.com.s3-website-us-east-1.amazonaws.com");
		        }).error(function(data, status) {
 				     console.log("error error error ......... ");
		            console.log(data);
				});

	        }).catch( function(result){
	        	console.log(result);
	        });
	}
}]);



