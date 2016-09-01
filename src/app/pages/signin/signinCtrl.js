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
            UserPoolId : 'us-east-1_vivy8Tb0Q',
            ClientId : '1f4qsiknh7p3th045vf1tv2r4d'
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

                cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                  console.log(err);
                  console.log(result);
                    return;
                }
                console.log(result);
                for (i = 0; i < result.length; i++) {
                    console.log(result);
                    console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
                }
              });



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
