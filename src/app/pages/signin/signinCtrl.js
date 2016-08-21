(function () {
  'use strict';

  angular.module('BlurAdmin.signin')
    .controller('SignInCtrl', SignInCtrl);

  /** @ngInject */
  function SignInCtrl($scope,$state,$window,AuthenticationService){
      var vm= this;
        //console.log('access token + ');

        //sign in function starts from here
      vm.signIn = function () {

        AWSCognito.config.region = 'us-west-2';

        var authenticationData = {
            Username : vm.username,
            Password : vm.password,
        };

        console.log(vm.username,vm.password);

        // hard coded credentials for the test!
        if (vm.username == "nadun" && vm.password == "nadun"){
            $state.go('dashboard.home');
            //appConf.isAuthorized = true;
            AuthenticationService.setLoggedIn(true);
        }
        else {
          console.log("wrong credentials");
        }
      //   var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
      //   var poolData = {
      //       UserPoolId : 'us-west-2_Wx15G37Co',
      //       ClientId : '50s9gm3dpvki6bsjhj9eijgsou'
      //   };
      //   var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
      //   var userData = {
      //       Username : 'niroshanr',
      //       Pool : userPool
      //   };
      //
      //   var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
      //   cognitoUser.authenticateUser(authenticationDetails, {
      //       onSuccess: function (result) {
      //           console.log('access token + ' + result.getAccessToken().getJwtToken());
      //            $window.location.href = '#/dashboard/home';
      //
      //       },
      //
      //       onFailure: function(err) {
      //           alert(err);
      //       },
      //
      //   });
      //
       }

  };

})();
