/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.profile')
        .controller('ProfilePageCtrl', ProfilePageCtrl);

    /** @ngInject */
    function ProfilePageCtrl($scope, fileReader, $filter, $http, toastr, $uibModal, AuthenticationService, editableOptions, editableThemes) {
        $scope.picture = $filter('profilePicture')('Nasta');
        $scope.data = {};


        $scope.removePicture = function() {
            $scope.picture = $filter('appImage')('theme/no-photo.png');
            $scope.noPicture = true;
        };

        $scope.uploadPicture = function() {
            var fileInput = document.getElementById('uploadFile');
            fileInput.click();

        };

        var getDetails = function() {
            var name = AuthenticationService.getUser();

            var details = {
                "id": name
            };

            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };

            var datas = {
                id: "nadun1indunil@gmail.com"
            };


            $http({
                method: 'POST',
                url: 'https://rsrxpyrrz4.execute-api.us-east-1.amazonaws.com/dev/users/getUser',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "id": "nadun1indunil@gmail.com"
                }
            }).then(function successCallback(response) {
                console.log(response);
                $scope.data = {};

                console.log(response.data);

                $scope.data = response.data.Item;

                console.log(response.data.Item.social);
                if (response.data.Item.social == undefined) {
                    $scope.socialProfiles = [{
                        name: 'Facebook',
                        icon: 'socicon-facebook'
                    }, {
                        name: 'LinkedIn',
                        icon: 'socicon-linkedin'
                    }, {
                        name: 'GitHub',
                        icon: 'socicon-github'
                    }, {
                        name: 'StackOverflow',
                        icon: 'socicon-stackoverflow'
                    }];
                } else {
                    $scope.socialProfiles = response.data.Item.social;
                }

                if (response.data.Item.techs == undefined) {
                    $scope.techs = [{
                            "id": 1,
                            "name": "Angular"

                        }, {
                            "id": 2,
                            "name": "React"

                        }

                    ];
                } else {
                    $scope.techs = response.data.Item.techs;
                }
            }, function errorCallback(response) {
                console.log(response);
            });
        };


        getDetails();

        $scope.update = function() {
            var techs = JSON.parse(JSON.stringify($scope.techs));

            var social = JSON.parse(JSON.stringify($scope.socialProfiles));

            console.log("goals");
            if ($scope.data.goals == undefined) {
                $scope.data.goals = "future goals here";

            }
            console.log($scope.data.goals);
            var sc = JSON.stringify($scope.socialProfiles);
            var name = AuthenticationService.getUser();
            console.log(sc);

            var internDetails = $scope.data;

            internDetails.social = social;
            internDetails.techs = techs;
            internDetails.id = name;

            console.log(internDetails);


            $http({
                method: 'POST',
                url: 'https://rsrxpyrrz4.execute-api.us-east-1.amazonaws.com/dev/users/updateUser',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: internDetails
            }).then(function successCallback(response) {
                if (response.data == "SUCCESS") {
                    toastr.success('Your information has been saved successfully!','Success');
                } else {
                    toastr.error('response.data','ERROR');
                }
            }, function errorCallback(response) {
                toastr.error(response.data);
            });

        };


        $scope.socialProfiles = [{
            name: 'Facebook',
            icon: 'socicon-facebook'
        }, {
            name: 'LinkedIn',
            icon: 'socicon-linkedin'
        }, {
            name: 'GitHub',
            icon: 'socicon-github'
        }, {
            name: 'StackOverflow',
            icon: 'socicon-stackoverflow'
        }];

        $scope.techs = [{
                "id": 1,
                "name": "Angular"

            }, {
                "id": 2,
                "name": "React"

            }

        ];

        $scope.unconnect = function(item) {
            item.href = undefined;
        };

        $scope.showModal = function(item) {
            $uibModal.open({
                animation: true,
                controller: 'ProfileModalCtrl',
                templateUrl: 'app/pages/profile/partials/profileModal.html'
            }).result.then(function(link) {
                item.href = link;
            });
        };

        $scope.getFile = function() {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.picture = result;
                });
        };



        $scope.showGroup = function(user) {
            if (tech.group && $scope.groups.length) {
                var selected = $filter('filter')($scope.groups, {
                    id: tech.group
                });
                return selected.length ? selected[0].text : 'Not set';
            } else return 'Not set';
        };

        $scope.showStatus = function(user) {
            var selected = [];
            if (tech.status) {
                selected = $filter('filter')($scope.statuses, {
                    value: tech.status
                });
            }
            return selected.length ? selected[0].text : 'Not set';
        };


        $scope.removeUser = function(index) {
            $scope.techs.splice(index, 1);
        };

        $scope.addUser = function() {
            $scope.inserted = {
                id: $scope.techs.length + 1,
                name: '',
                status: null,
                group: null
            };
            $scope.techs.push($scope.inserted);
        };

        editableOptions.theme = 'bs3';
        editableThemes['bs3']
            .submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3']
            .cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

    }

})();
