(function () {
  'use strict';

  angular.module('BlurAdmin.signin')
    .controller('SignInCtrl', SignInCtrl);

  /** @ngInject */
  function SignInCtrl($scope,$state,$window,AuthenticationService,toastr){
      var vm= this;
        //console.log('access token + ');

        //sign in function starts from here
      vm.signIn = function () {

        AWSCognito.config.region = 'us-east-1';

        var authenticationData = {
            Username : vm.username,
            Password : vm.password,
        };

        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        var poolData = {
            UserPoolId : ' us-east-1_axj5uw9kj',
            ClientId : '1blbmqslmk42i22u1258i7gmgi'
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
                $state.go('dashboard.home');
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
