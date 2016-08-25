(function () {
  'use strict';

  angular.module('BlurAdmin.signin')
    .controller('SignInCtrl', SignInCtrl);

  /** @ngInject */
  function SignInCtrl($scope,$state,$window,AuthenticationService,toastr){
      var vm= this;
        //console.log('access token + ');

        //sign in function starts from here


      vm.loginAuthenticate =function (cognitoUser) {



      };

      // forgot password

      vm.forgot= function(){


        AWSCognito.config.region = 'us-west-2';

        var authenticationData = {
            Username : "niroshanr@99x.lk",
            Password : " dcvs",
        };

        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        var poolData = {
            UserPoolId : 'us-west-2_Wx15G37Co',
            ClientId : '50s9gm3dpvki6bsjhj9eijgsou'
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        var userData = {
            Username : "niroshanr@99x.lk",
            Pool : userPool
        };

        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        console.log("kdjhd");


        //veryfy

/*
        cognitoUser.resendConfirmationCode(function(err, result) {
                 if (err) {
                     console.log(err);;
                     return;
                    }
                  console.log(result+"jdfjhdj");;
             });
             */

            //

/*
            cognitoUser.confirmRegistration(274268, function(err, result) {
                if (err) {
                    alert(err);
                    return;
                }
                alert(result);
            });

            */

/*
            cognitoUser.getAttributeVerificationCode('email', {
                   onSuccess: function (result) {
                       console.log('call result: ' + result);
                   },
                   onFailure: function(err) {
                       alert(err);
                   },
                   inputVerificationCode() {
                       var verificationCode = prompt('Please input verification code: ' ,'274268');
                       cognitoUser.verifyAttribute('email', '274268', this);
                   }
               });
*/
/*
        cognitoUser.getAttributeVerificationCode('email', {
        onSuccess: function (result) {
            console.log('call result: ' + result);
        },
        onFailure: function(err) {
            alert(err);
        },
        inputVerificationCode() {
            var verificationCode = prompt('Please input verification code: ' ,'');
            cognitoUser.verifyAttribute('email', verificationCode, this);
        }
     });

     */




        cognitoUser.forgotPassword({
       onSuccess: function (result) {
           console.log('call result: ' + result);
       },
       onFailure: function(err) {
           console.log(err);;
       },
       inputVerificationCode() {
           var verificationCode = prompt('Please input verification code ' ,'');
           var newPassword = prompt('Enter new password ' ,'');
           cognitoUser.confirmPassword(verificationCode, newPassword, this);
       }
   });



      };

  };



})();
