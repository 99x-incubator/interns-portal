(function() {
    'use strict';

    angular.module('BlurAdmin.signin')
        .controller('SignInCtrl', SignInCtrl);

    /** @ngInject */
    function SignInCtrl($scope, $state, $window, $timeout, commonService, AuthenticationService, toastr, printService) {

        AWSCognito.config.region = IG.cognitoConfigRegion;

        var poolData = {
            UserPoolId: IG.cognitoUserPoolId,
            ClientId: IG.cognitoClientId
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

        // FIXME: these two declaration
        var verificationCode;
        var username;

        // take verification code, user's input
        $scope.values = function() {
            window.verificationCode = $scope.verification_code;

        };

        // get triggered once user provide the email id from forgot password section view
        $scope.forgot = function() {

            var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

            // $rootScope.username = $scope.username;
            window.username = $scope.username;

            var userData = {
                Username: $scope.username,
                Pool: userPool
            };

            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);


            cognitoUser.forgotPassword({
                onSuccess: function(result) {
                    toastr.success(result.message, 'Success');
                },
                onFailure: function(err) {
                    toastr.error(err.message, 'Error');
                },
                inputVerificationCode: function() {
                }
            });

        };

        // changing password functionality with verification code
        $scope.changePassword = function(){

            var new_Password = $scope.new_password;

            var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

            var userChangeData = {
                Username: window.username,
                Pool: userPool
            };

            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userChangeData);

            var verificationCode = window.verificationCode.toString();

            cognitoUser.verifyAttribute(window.username.toString(), verificationCode, this,{
                onSuccess: function (result) {
                    toastr.success(result.message, 'Success');
                },

                onFailure: function(err) {
                    toastr.error(err.message, 'Error');
                },
                inputVerificationCode: function() {
                    cognitoUser.confirmPassword(verificationCode, new_Password, this);
                    // $location.href = '#/signin/signin';
                }
            });
        };

        // user signin functionality
        $scope.signIn = function() {

            var authenticationData = {
                Username: $scope.username,
                Password: $scope.password,
            };

            var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

            var userData = {
                Username: $scope.username,
                Pool: userPool
            };

            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function(result) {

                    cognitoUser.getUserAttributes(function(err, result) {
                        if (err) {
                            toastr.error(err, 'Error');
                            return null;
                        }
                        var admin = ''; // temp bypass for the problem of 5 elements and 4 elements supply from API required a proper fix
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].getName() == "name") {
                                admin = result[i].getValue();
                            }
                        }

                        if (admin == 'ADMIN') {
                            AuthenticationService.setAdmin(true);

                        } else {
                            AuthenticationService.setAdmin(false);
                        }

                        AuthenticationService.setUser($scope.username);
                        AuthenticationService.setLoggedIn(true);
                        $state.go('dashboard.home.users');
                    });
                },
                onFailure: function(err) {
                    toastr.error(err.message, 'Error');
                },

            });
        };

    }
})();