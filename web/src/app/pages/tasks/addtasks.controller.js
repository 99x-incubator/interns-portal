(function() {
    'use strict';

    angular.module('BlurAdmin.pages.addtasks').controller('AddTasksPageCtrl', AddTasksPageCtrl);

    function AddTasksPageCtrl($scope, $uibModal, $http, toastr, toastrConfig) {
        $scope.tasks = [];

        var defaultConfig = angular.copy(toastrConfig);

        var getAllTasks = function() {
            $http.get('https://ezh9ingj6l.execute-api.us-east-1.amazonaws.com/dev/allTask').then(function(response) {
                console.log(response);
                if (response.data.status = 'success') {
                    $scope.tasks = (response.data.data.Items);
                } else {
                    toastr.error("Error in loading tasks");
                }

            });
        }
        getAllTasks();



        $scope.reset = function() {
            $scope.newtask = angular.copy($scope.master);
        };

        $scope.addtask = function() {
            $scope.submitted = true;
            if (($scope.add.newtask.$dirty || $scope.submitted) && $scope.add.newtask.$error.required) {
                console.log("do nothing");
            } else {
                var newtask = {
                    'task': $scope.newtask
                };
                var task = $scope.newtask;
                console.log(newtask);
                var config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                };

                $http.post('https://ezh9ingj6l.execute-api.us-east-1.amazonaws.com/dev/insertNewTask', newtask).then(function(response) {
                    //console.log($scope.tasks);
                    //getAllTasks();
                    console.log(response.data.status);
                    if ((response.data.status) == 'success') {
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

                //console.log($scope.tasks);
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
                console.log($scope.tasks[task].id);
                var tasktodelete = {
                    'id': $scope.tasks[task].id
                };
                $http.post('https://ezh9ingj6l.execute-api.us-east-1.amazonaws.com/dev/disableTask', tasktodelete).then(function(response) {
                    //console.log(response);
                    if ((response.data.status) == 'success') {
                        $scope.tasks.splice(task, 1);
                        toastr.success("Task deleted successfully");
                    } else {
                        toastr.error("Error in deleting task");
                    }


                    //getAllTasks();
                });

            });

        };


    }
})();
