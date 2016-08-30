(function () {
  'use strict';

  angular.module('BlurAdmin.signin')
    .controller('SignInCtrl', SignInCtrl);

  /** @ngInject */
  function SignInCtrl($scope,$state,$window,AuthenticationService,toastr){
      var vm= this;
        //console.log('access token + ');
        AWSCognito.config.region = 'us-west-2';

        var poolData = {
            UserPoolId : 'us-west-2_Wx15G37Co',
            ClientId : '50s9gm3dpvki6bsjhj9eijgsou'
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        //sign in function starts from here

        vm.confirm =function(){

          var userData = {
              Username : vm.username,
              Pool : userPool
          };

          var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

          cognitoUser.confirmRegistration(vm.code, true, function(err, result) {
         if (err) {
             alert(err);
             return;
         }
         console.log('call result: ' + result);
     });

        };

        vm.forgot= function(){

          var userData = {
              Username :  vm.username,
              Pool : userPool
          };

          var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

          cognitoUser.forgotPassword({
              onSuccess: function (result) {
                  console.log('call result: ' + result);
              },
              onFailure: function(err) {
                  alert(err);
              },
              inputVerificationCode() {
                  var verificationCode = prompt('Please input verification code ' ,'');
                  var newPassword = prompt('Enter new password ' ,'');
                  cognitoUser.confirmPassword(verificationCode, newPassword, this);
              }
          });

        }



      vm.signIn = function () {

        AWSCognito.config.region = 'us-west-2';

        var authenticationData = {
            Username : vm.username,
            Password : vm.password,
        };

        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        var poolData = {
            UserPoolId : 'us-west-2_Wx15G37Co',
            ClientId : '50s9gm3dpvki6bsjhj9eijgsou'
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        var userData = {
            Username : vm.username,
            Pool : userPool
        };

        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log(result);
                console.log('access token + ' + result.getAccessToken().getJwtToken());
                $state.go('dashboard.home');
                //appConf.isAuthorized = true;
                AuthenticationService.setLoggedIn(true);
                AuthenticationService.setAdmin(true);

            },

            onFailure: function(err) {
                //alert(err);
                toastr.error(err.message, 'Error');
            },

        });

       }

  };

})();
