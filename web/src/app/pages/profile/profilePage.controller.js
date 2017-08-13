(function() {
    'use strict';

    angular.module('BlurAdmin.pages.profile')
        .controller('ProfilePageCtrl', ProfilePageCtrl);

    /** @ngInject */
    function ProfilePageCtrl($scope, fileReader, $filter, $http, toastr, $uibModal, AuthenticationService, editableOptions, editableThemes, Upload, S3UploadService, user) {
        $scope.picture = null;

        $scope.uploadFiles = function(files) {
            $scope.Files = files;

            if (files && files.length > 0) {
                angular.forEach($scope.Files, function(file, key) {
                    S3UploadService.Upload(file).then(function(result) {
                        // Mark as success
                        file.Success = true;
                        $scope.picture = "https://s3.amazonaws.com/99xt-interns-uploads/profile/" + file.name;
                        $scope.data.profile = $scope.picture;
                        $scope.update($scope.picture);
                    }, function(error) {
                        // Mark the error
                        $scope.Error = error;
                    }, function(progress) {
                        // Write the progress as a percentage
                        file.Progress = (progress.loaded / progress.total) * 100;
                        $scope.fileProgress = file.Progress;
                    });
                });
            }
        };


        $scope.removePicture = function() {
            $scope.picture = $filter('appImage')('theme/no-photo.png');
            $scope.noPicture = true;
        };

        $scope.uploadPicture = function() {
            var fileInput = document.getElementById('uploadFile');
            fileInput.click();
        };



        $scope.data = user;
        var social = [{
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
        $scope.socialProfiles = user.social || social;

        var techs = [{
                "id": 1,
                "name": "javascript"
            }

        ];
        $scope.techs = user.techs || techs;


        $scope.update = function(profile) {
            // update user details using the form in view.
            var techs = JSON.parse(JSON.stringify($scope.techs));

            var social = JSON.parse(JSON.stringify($scope.socialProfiles));

            if (!$scope.data.goals) {
                $scope.data.goals = "future goals here";

            }
            var sc = JSON.stringify($scope.socialProfiles);
            var name = AuthenticationService.getUser();

            var internDetails = $scope.data;
            internDetails.profile = profile || $scope.data.profile;
            internDetails.social = social;
            internDetails.techs = techs;
            internDetails.id = name;

            $http({
                method: 'POST',
                url: IG.api + 'users/user',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: internDetails
            }).then(function successCallback(response) {
                if (response.data.status == "success") {
                    toastr.success('Your information has been saved successfully!', 'Success');
                } else {
                    toastr.error('response.data', 'ERROR');
                }
            }, function errorCallback(response) {
                toastr.error(response.data);
            });


        };

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
