(function () {
    'use strict';


    angular.module('BlurAdmin.pages.home')
        .filter('split', function () {
            return function (input, splitChar, splitIndex) {
                // do some bounds checking here to ensure it has that index
                return input.split(splitChar)[splitIndex];
            };
        })
        .controller('HomeCtrl', HomeCtrl);
    /** @ngInject */
    function HomeCtrl($http, $scope, $rootScope, printService, $state, interns, tasks) {

        $scope.user = {};
        $scope.tabs = interns;
        $scope.tasks = tasks;

        console.log(tasks);


        $scope.navigationCollapsed = true;
        $scope.showCompose = function (subject, to, text) {
            composeModal.open({
                subject: subject,
                to: to,
                text: text
            });
        };

        $scope.getUserProfile = function (key) {
            $scope.user = $scope.tabs[key];
            if ($scope.user.tasks && $scope.user.tasks[0]) {
                $scope.unassignedTasks = []
                $scope.tasks.forEach(function (task, key) {
                    var isAssigned = false;
                    $scope.user.tasks.forEach(function (assignedTask, asKey) {
                        if (assignedTask.id === task.id) {
                            isAssigned = true;
                        }
                    })
                    if (!isAssigned) {
                        $scope.unassignedTasks.push(task);
                    }
                })
            } else {
                $scope.unassignedTasks = $scope.tasks;
            }

            $state.go('dashboard.home.user');
        };

        $scope.assignTaskToUser = function (taskId) {
            if (!$scope.user.tasks) {
                $scope.user.tasks = [];
            }
            $scope.user.tasks.push({
                id: taskId,
                status: 'ToDo'
            });

            $http({
                method: 'POST',
                url: IG.api + 'users/user',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.user
            }).then(function successCallback(response) {
                if (response.data.status == "success") {
                    $scope.unassignedTasks = _.filter($scope.unassignedTasks, function (task) {
                        return task.id !== taskId;
                    });
                    toastr.success('Your information has been saved successfully!', 'Success');
                } else {
                    $scope.user.tasks = _.filter($scope.user.tasks, function (task) {
                        return task.id !== taskId;
                    });
                    toastr.error('response.data', 'ERROR');
                }
            }, function errorCallback(response) {
                $scope.user.tasks = _.filter($scope.user.tasks, function (task) {
                    return task.id !== taskId;
                });
                toastr.error(response.data);
            });
        };

        $scope.viewUserTasks = function (userId) {
            $rootScope.adminLoggedIn = true;
            $rootScope.adminSerachingUserId = userId;
            $state.go('dashboard.viewtasks');
        }

        $state.transitionTo('dashboard.home.users');
        internsTimeline($scope.tabs);
    }

    function internsTimeline(interns) {

        var container = document.getElementsByClassName('js-visualization')[0];

        var data = [];
        angular.forEach(interns, function (item) {
            // temp solution for error of startdate doesn't exist.
            if (item.startdate) {
                data.push({
                    id: item.id,
                    content: item.firstname,
                    start: item.startdate,
                    end: item.enddate
                });

            }
        });
        // Create a DataSet (allows two way data-binding)
        var items = new vis.DataSet(data);

        // Configuration for the Timeline
        var options = {};

        // Create a Timeline
        var timeline = new vis.Timeline(container, items, options);
    }

})();
