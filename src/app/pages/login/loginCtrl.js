(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile')
    .controller('LoginCtrl', LoginCtrl);

  /** @ngInject */
  function LoginCtrl($scope) {



  vm.conformLogin = function () {

    var userData = {
               Username : 'username',
               Pool : userPool
           };

           cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);

           var authenticationData = {
               Username : 'username',
               Password : 'password',
           };

           var authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

           cognitoUser.authenticateUser(authenticationDetails, {
               onSuccess: function (result) {
                   alert('authentication successful!')
               },

               onFailure: function(err) {
                   alert(err);
               },

               mfaRequired: function(codeDeliveryDetails) {
                   var verificationCode = prompt('Please input verification code' ,'');
                   cognitoUser.sendMFACode(verificationCode, this);
               }

           });
  }

  };

})();
