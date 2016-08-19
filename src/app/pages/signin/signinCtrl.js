(function () {
  'use strict';

  angular.module('BlurAdmin.signin')
    .controller('SignInCtrl', SignInCtrl);

  /** @ngInject */
  function SignInCtrl($scope){
      var vm= this;

      vm.signIn = function () {

         AWSCognito.config.region = 'us-west-2';

           var authenticationData = {
            Username : 'niroshanr',
            Password : '7870@VvV99XT@se',
        };
        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        var poolData = { UserPoolId : 'us-west-2_Wx15G37Co',
            ClientId : '50s9gm3dpvki6bsjhj9eijgsou'
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        var userData = {
            Username : 'niroshanr',
            Pool : userPool
        };
        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log('access token + ' + result.getAccessToken().getJwtToken());
            },

            onFailure: function(err) {
                alert(err);
            },

        });

      }

  };

})();
