(function () {
    'use strict';

    angular.module('BlurAdmin.pages.viewtasks').controller('ViewTasksPageCtrl', ViewTasksPageCtrl);


    function ViewTasksPageCtrl($scope, $timeout, $http, $state, AuthenticationService, toastr, toastrConfig, user) {
        $scope.user = user;
        
        $scope.addComment = function (taskId, text) {
            $scope.user.tasks.forEach(function (task, key) {
                if (task.id === taskId) {
                    if (!$scope.user.tasks[key].comments) {
                        $scope.user.tasks[key].comments = []
                    }
                    $scope.user.tasks[key].comments.push({
                        text: text,
                        timestamp: Date.now(),
                        status: "active"
                    })
                }
            });
            updateUser();
        }

        $scope.startTask = function (taskId) {
            $scope.user.tasks.forEach(function (task, key) {
                if (task.id === taskId) {
                    $scope.user.tasks[key].status = 'InProgress';
                    $scope.user.tasks[key].startedDate = Date.now();
                }
            });
            updateUser();
        }

        $scope.finishTask = function (taskId) {
            $scope.user.tasks.forEach(function (task, key) {
                if (task.id === taskId) {
                    $scope.user.tasks[key].status = 'Done';
                    $scope.user.tasks[key].finishedDate = Date.now();

                }
            });
            updateUser();
        }

        function updateUser(){

            $http({
                method: 'POST',
                url: IG.api + 'users/user',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.user
            }).then(function successCallback(response) {
                if (response.data.status == "success") {
                    toastr.success('Your information has been saved successfully!', 'Success');
                } else {
                    toastr.error('response.data', 'ERROR');
                    $state.reload();
                }
            }, function errorCallback(response) {
                toastr.error(response.data);
                $state.reload();
            });
        }

    }
})();
