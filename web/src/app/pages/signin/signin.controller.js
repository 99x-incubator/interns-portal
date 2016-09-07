(function() {
    'use strict';

    angular.module('BlurAdmin.signin')
        .controller('SignInCtrl', SignInCtrl);

    /** @ngInject */
    function SignInCtrl($scope, $state, $window, $timeout, commonService, AuthenticationService, toastr, printService) {

        AWSCognito.config.region = 'us-east-1';

        var poolData = {
            UserPoolId: 'us-east-1_vivy8Tb0Q',
            ClientId: '1f4qsiknh7p3th045vf1tv2r4d'
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        //sign in function starts from here

        $scope.confirm = function() {

            var userData = {
                Username: $scope.username,
                Pool: userPool
            };

            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            cognitoUser.confirmRegistration($scope.code, true, function(err, result) {
                if (err) {
                    toastr.error(err.message, 'Error');
                    return;
                }
                toastr.success(result.message, 'Success');
            });

        };

        $scope.forgot = function() {

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
                    var verificationCode = prompt('Please input verification code ', '');
                    var newPassword = prompt('Enter new password ', '');
                    cognitoUser.confirmPassword(verificationCode, newPassword, this);
                }
            });

        };


        $scope.signIn = function() {
            AuthenticationService.setUser($scope.username);
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

                        $state.go('dashboard.home'); //error
                        AuthenticationService.setLoggedIn(true);

                    });
                },
                onFailure: function(err) {
                    toastr.error(err.message, 'Error');
                },

            });
        };
    }
})();
