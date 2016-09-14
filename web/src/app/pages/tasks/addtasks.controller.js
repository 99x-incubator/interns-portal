(function() {
    'use strict';

    angular.module('BlurAdmin.pages.addtasks').controller('AddTasksPageCtrl', AddTasksPageCtrl);

    function AddTasksPageCtrl($scope, $uibModal, $http, toastr, toastrConfig) {
        $scope.tasks = [];

        var defaultConfig = angular.copy(toastrConfig);
        var openedToasts = [];
        $scope.options = {
            autoDismiss: false,
            positionClass: 'toast-top-right',
            type: 'success',
            timeOut: '5000',
            extendedTimeOut: '2000',
            allowHtml: false,
            closeButton: true,
            tapToDismiss: true,
            progressBar: false,
            newestOnTop: true,
            maxOpened: 0,
            preventDuplicates: false,
            preventOpenDuplicates: false,
            title: "",
            msg: "Task added successfully"
        };

        var getAllTasks = function() {
            $http.get('http://localhost:3000/dev/tasks/allTask').then(function(response) {
                console.log(response);
                $scope.tasks = (response.data.data.Items);

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

                $http.post('https://04z6zajmp1.execute-api.us-east-1.amazonaws.com/dev/insertNewTask', newtask).then(function(response) {
                    //console.log($scope.tasks);
                    //getAllTasks();
                    console.log(response.data.status);
                    if ((response.data.status) == 'success') {
                        $scope.tasks.push({
                            'id': task
                        })
                        angular.extend(toastrConfig, $scope.options);
                        openedToasts.push(toastr[$scope.options.type]($scope.options.msg, $scope.options.title));
                        var strOptions = {};
                        for (var o in $scope.options)
                            if (o != 'msg' && o != 'title') strOptions[o] = $scope.options[o];
                    } else {
                        $scope.options['msg'] = "Error in adding task";
                        $scope.options['type'] = "error";
                        angular.extend(toastrConfig, $scope.options);
                        openedToasts.push(toastr[$scope.options.type]($scope.options.msg, $scope.options.title));
                        var strOptions = {};
                        for (var o in $scope.options)
                            if (o != 'msg' && o != 'title') strOptions[o] = $scope.options[o];
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
                $http.post('https://04z6zajmp1.execute-api.us-east-1.amazonaws.com/dev/disableTask', tasktodelete).then(function(response) {
                    //console.log(response);
                    if ((response.data.status) == 'success') {
                        $scope.tasks.splice(task, 1);
                        $scope.options['msg'] = "Task deleted successfully";
                        angular.extend(toastrConfig, $scope.options);
                        openedToasts.push(toastr[$scope.options.type]($scope.options.msg, $scope.options.title));
                        var strOptions = {};
                        for (var o in $scope.options)
                            if (o != 'msg' && o != 'title') strOptions[o] = $scope.options[o];

                    } else {
                        $scope.options['type'] = "error";
                        $scope.options['msg'] = "Error in deleting Task";
                        angular.extend(toastrConfig, $scope.options);
                        openedToasts.push(toastr[$scope.options.type]($scope.options.msg, $scope.options.title));
                        var strOptions = {};
                        for (var o in $scope.options)
                            if (o != 'msg' && o != 'title') strOptions[o] = $scope.options[o];
                    }


                    //getAllTasks();
                });

            });

        };


    }
})();
