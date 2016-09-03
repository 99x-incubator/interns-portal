(function() {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('settingsCtrl', settingsCtrl);

    /** @ngInject */
    function settingsCtrl($scope, $state, $window, AuthenticationService, toastr, printService) {

        $scope.data = {
            'confirmPassword': '',
            'newPassword': '',
            'currentPassword': ''
        };

        $scope.arePersonalInfoPasswordsEqual = function() {
            printService.print($scope.data.confirmPassword, $scope.data.newPassword);
            return $scope.data.confirmPassword && $scope.data.newPassword == $scope.data.confirmPassword;

        };

        $scope.check = function() {


            if ($scope.data.newPassword != $scope.data.confirmPassword) {
                toastr.error("passwords doesn't match");
                printService.print('password error', $scope.data.confirmPassword, $scope.data.newPassword);
            } else {
                if ($scope.data.useremail == AuthenticationService.getUser()) {
                    // user and password are correct
                    AWSCognito.config.region = 'us-west-2';

                    var authenticationData = {
                        Username: $scope.data.useremail,
                        Password: $scope.data.currentPassword,
                    };
                    // TEMP: change of user pool client is required
                    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
                    var poolData = {
                        UserPoolId: 'us-west-2_Wx15G37Co',
                        ClientId: '50s9gm3dpvki6bsjhj9eijgsou'
                    };
                    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
                    var userData = {
                        Username: $scope.data.useremail,
                        Pool: userPool
                    };

                    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

                    cognitoUser.authenticateUser(authenticationDetails, {
                        onSuccess: function(result) {
                            printService.print(result);
                            cognitoUser.changePassword($scope.data.currentPassword, $scope.data.confirmPassword, function(err, result) {
                                if (err) {
                                    //alert(err);
                                    toastr.error(err.message, 'Error');
                                    return;
                                }

                                printService.print('Sucess call result: ' + result);
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
        };
    }

})();
