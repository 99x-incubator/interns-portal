(function() {
    'use strict';

    angular.module('BlurAdmin.signin')
        .controller('SignInCtrl', SignInCtrl);

    /** @ngInject */
    function SignInCtrl($scope, $state, $window, AuthenticationService, toastr, printService) {

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
                    alert(err);
                    return;
                }
                printService.print('call result: ' + result);
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
                    printService.print('call result: ' + result);
                },
                onFailure: function(err) {
                    toastr.error(err, 'Error');
                },
                inputVerificationCode() {
                    var verificationCode = prompt('Please input verification code ', '');
                    var newPassword = prompt('Enter new password ', '');
                    cognitoUser.confirmPassword(verificationCode, newPassword, this);
                }
            });

        };

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
                    printService.print(result);

                    cognitoUser.getUserAttributes(function(err, result) {
                        if (err) {
                            printService.print(err);
                            return;
                        }
                        for (var i = 0; i < result.length; i++) {
                            printService.print(result);
                            printService.print('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
                        }

                        if (result[2].getValue() == 'ADMIN') {
                            AuthenticationService.setAdmin(true);

                        } else {
                            AuthenticationService.setAdmin(false);
                        }

                        AuthenticationService.setUser(result[3].getValue());
                    });
                    $state.go('dashboard.home');
                    AuthenticationService.setLoggedIn(true);
                },
                onFailure: function(err) {
                    //alert(err);
                    toastr.error(err.message, 'Error');
                },

            });
        };
    }
})();
