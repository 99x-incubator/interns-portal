(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.settings')
    .controller('settingsCtrl', settingsCtrl);

  /** @ngInject */
  function settingsCtrl($scope,$state,$window,AuthenticationService,toastr){
      var vm = this;
      var data = {}


      vm.check = function () {


        if (vm.data.newPassword != vm.data.confirmPassword){
            toastr.error("passwords doesn't match");
            console.log('password error',vm.data.confirmPassword,vm.data.newPassword);
        }
        else {
          if(vm.data.useremail == AuthenticationService.getUser() ){
            // user and password are correct
            AWSCognito.config.region = 'us-west-2';

            var authenticationData = {
                Username : vm.data.useremail,
                Password : vm.data.currentPassword,
            };

            var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
            var poolData = {
                UserPoolId : 'us-west-2_Wx15G37Co',
                ClientId : '50s9gm3dpvki6bsjhj9eijgsou'
            };
            var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
            var userData = {
                Username : vm.data.useremail,
                Pool : userPool
            };

            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log(result);
                    cognitoUser.changePassword(vm.data.currentPassword, vm.data.confirmPassword, function(err, result) {
                        if (err) {
                            //alert(err);
                            toastr.error(err.message,'Error')
                            return;
                        }
                        console.log('Sucess call result: ' + result);
                        toastr.success('password changes successfully');
                    });


                },

                onFailure: function(err) {
                    //alert(err);
                    toastr.error(err.message, 'Error');
                },

            });
          }
        }
      }






  };

})();
