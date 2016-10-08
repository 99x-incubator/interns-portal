(function() {
    'use strict';

    angular.module('BlurAdmin.pages.viewtasks').controller('ViewTasksPageCtrl', ViewTasksPageCtrl);


    function ViewTasksPageCtrl($scope, $timeout, $http, AuthenticationService, toastr, toastrConfig, datas, data) {

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
            msg: "My plan updated"
        };

        $scope.list1 = datas;

        /*Get users current tasks*/
        var userID = {
            "id": AuthenticationService.getUser()
        };


        $scope.list4 = [];



        //add user task function, from this new tasks will add to the plan
        var addUserTasks = function() {
            var newTask = {
                "id": AuthenticationService.getUser(),
                "task": $scope.list4
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

        $scope.list4 = data.task;

        $scope.hideMe = function() {
            if ($scope.list4 != undefined) return $scope.list4.length > 0;
        };

        //task delete button funcction
        $scope.delete = function(item) {
            $scope.list4.splice($scope.list4.indexOf(item), 1);
        };

        //Actions for save button
        $scope.savetasks = function() {
            addUserTasks();
            print($scope.list4);
        };

    }

    function print($print) {
        console.log($print);
    }
})();
