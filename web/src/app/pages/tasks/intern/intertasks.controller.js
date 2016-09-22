(function() {
    'use strict';

    angular.module('BlurAdmin.pages.interntasks').controller('InternsTasksPageCrl', InternsTasksPageCrl);


    function InternsTasksPageCrl($scope, $timeout, $http, AuthenticationService, toastr, toastrConfig) {
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
            msg: "Intern task retrieved"
        };



        $scope.internsCurrentTasks = [];

        $scope.hideMe = function() {
            return $scope.internsCurrentTasks.length <= 0;
        };

        var getUserCurrenTasks = function($email) {
            var userID = {
                "id": $email
            };
            $http.post(IG.api + 'tasks/getUserTask', userID).then(function(response) {
                if (response.data.status == "success") {
                    $scope.internsCurrentTasks = response.data.data.Item.task;
                    //print("tasks retrieve");
                    print($scope.internsCurrentTasks);
                    if ($scope.internsCurrentTasks.length === 0) {
                        $scope.options['msg'] = "no tasks";
                        $scope.options['type'] = "error";
                        angular.extend(toastrConfig, $scope.options);
                        openedToasts.push(toastr[$scope.options.type]($scope.options.msg, $scope.options.title));
                        var strOptions = {};
                        for (var o in $scope.options)
                            if (o != 'msg' && o != 'title') strOptions[o] = $scope.options[o];
                    } else {
                      $scope.options['msg'] = "Intern task retrieved";
                      $scope.options['type'] = "success";
                        angular.extend(toastrConfig, $scope.options);
                        openedToasts.push(toastr[$scope.options.type]($scope.options.msg, $scope.options.title));
                        var strOptions = {};
                        for (var o in $scope.options)
                            if (o != 'msg' && o != 'title') strOptions[o] = $scope.options[o];
                    }
                } else if (response.data.status === "error") {
                    $scope.options['msg'] = "Error in retriving task";
                    $scope.options['type'] = "error";
                    angular.extend(toastrConfig, $scope.options);
                    openedToasts.push(toastr[$scope.options.type]($scope.options.msg, $scope.options.title));
                    var strOptions = {};
                    for (var o in $scope.options)
                        if (o != 'msg' && o != 'title') strOptions[o] = $scope.options[o];
                    print("User authentication error");
                }
            });
        };
        //getUserCurrenTasks(AuthenticationService.getUser());

        $scope.interns = [{
            'name': 'Pasan',
            'id': 'pmartz92@gmail.com'
        }, {
            'name': 'Chamath',
            'id': 'pmartz92@gmail.com'
        }, {
            'name': 'Maneesha',
            'id': 'maneeshap@99x.lk'
        }, {
            'name': 'Niroshan',
            'id': 'niroshan8889@gmail.com'
        }];
        var internID;
        $scope.getInternTasks = function($id) {
            internID = $scope.interns[$id].id;
            getUserCurrenTasks(internID);
        };

        $scope.taskComplete = function($id) {
            $scope.internsCurrentTasks[$id].status = "complete";
            print($scope.internsCurrentTasks[$id].status);
        }

        //add user task function, from this new tasks will add to the plan
        var addUserTasks = function($id) {
            var newTask = {
                "id": $id,
                "task": $scope.internsCurrentTasks
            };

            $http.post( IG.api + 'tasks/updateUserTask', newTask).then(function(response) {
                if (response.data.status == "success") {
                    angular.extend(toastrConfig, $scope.options);
                    openedToasts.push(toastr[$scope.options.type]($scope.options.msg, $scope.options.title));
                    var strOptions = {};
                    for (var o in $scope.options)
                        if (o != 'msg' && o != 'title') strOptions[o] = $scope.options[o];
                    print("task added");
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
        };


        $scope.savetasks = function() {
            addUserTasks(internID);
            //print(internID);
        };

    }

    function print($print) {
        console.log($print);
    }
})();
