(function() {
    'use strict';

    angular.module('BlurAdmin.pages.addtasks').controller('AddTasksPageCtrl', AddTasksPageCtrl);

    function AddTasksPageCtrl($scope, $uibModal, $http, toastr, toastrConfig, tasks) {
        $scope.tasks = [];

        var defaultConfig = angular.copy(toastrConfig);

        $scope.tasks = tasks;
        console.log(tasks);

        $scope.reset = function() {
            $scope.newtask = angular.copy($scope.master);
        };

        $scope.addtask = function() {
            $scope.submitted = true;
            if (($scope.add.newtask.$dirty || $scope.submitted) && $scope.add.newtask.$error.required) {
                $scope.submitted = true;
            } else {
                var newtask = {
                    'task': $scope.newtask
                };
                console.log(newtask)
                var task = $scope.newtask;
                var config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                };

                $http.post(IG.api + 'tasks/newTask', newtask).then(function(response) {
                    if ((response.data.status) === "success") {
                        $scope.tasks.push({
                            'id': task
                        })
                        toastr.success("Task added successfully");
                    } else {
                        toastr.error("Error in adding task");
                    }

                });

                $scope.submitted = false;
                $scope.reset();
            }
        };

        $scope.deleteItem = function(task) {
            $uibModal.open({
                animation: true,
                controller: 'AddModalCtrl',
                templateUrl: 'app/pages/tasks/modal/addtaskmodal.html',
                resolve: {
                    task: function() {
                        return $scope.tasks.indexOf(task);
                    }
                }
            }).result.then(function(task) {
                var tasktodelete = {
                    'id': $scope.tasks[task].id
                };
                $http.post(IG.api + 'tasks/disableTask', tasktodelete).then(function(response) {
                    if ((response.data.status) === "success") {
                        $scope.tasks.splice(task, 1);
                        toastr.success("Task deleted successfully");
                    } else {
                        toastr.error("Error in deleting task");
                    }
                });

            });
        };
    }
})();
