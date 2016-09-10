(function() {
    'use strict';

    angular.module('BlurAdmin.pages.viewtasks').controller('ViewTasksPageCtrl', ViewTasksPageCtrl);


    function ViewTasksPageCtrl($scope, $timeout, $http, AuthenticationService) {

        /* Get tasks list from API, these are the tast that currently available*/

        // $http.get('https://04z6zajmp1.execute-api.us-east-1.amazonaws.com/dev/allTask').then(function tasksList(response){
        //   $scope.list1 = response.data.data.Items;
        //   //print($scope.list6);
        // });


        /*Get users current tasks*/
        var userID = {
            "id": 'test1@gmail.com'
        };

        var getUserCurrenTasks = function() {
            $http.post('https://04z6zajmp1.execute-api.us-east-1.amazonaws.com/dev/getUserTask', userID).then(function(response) {
                if (response.data.status == "success") {
                    print(response.data.data.Item.task);
                } else if (response.data.status == "error") {
                    print("User authentication error");
                }
            });
        };
        //getUserCurrenTasks();
        var dd ={
    "id":"test1@gmail.com",
    "task":["task1","task2","task3","task4"]
};


        $scope.list4 = [{
            'id': 'Node',
            end: "2016-07-14",
            start: "2016-02-23"
        }, {
            'id': 'Angular',
            end: "2016-07-02",
            start: "2016-08-13"
        }];

        var addUserTasks = function() {
            $http.post('https://04z6zajmp1.execute-api.us-east-1.amazonaws.com/dev/updateUserTask', dd).then(function(response) {
                if (response.data.status == "success") {
                    print("task added");
                    getUserCurrenTasks();
                }
            });
        };

        $scope.list1 = [{
            'id': 'Node'
        }, {
            'id': 'Angular'
        }, {
            'id': 'React'
        }, {
            'id': 'Bootstrap'
        }, {
            'id': 'Leadership'
        }];


        $scope.hideMe = function() {
            return $scope.list4.length > 0;
        };

        //task delete button funcction
        $scope.delete = function(item) {
            $scope.list4.splice($scope.list4.indexOf(item), 1);
        };

        //Actions for save button
        $scope.savetasks = function() {
            print($scope.list4);
            addUserTasks();
        };

    }

    function print($print) {
        console.log($print);
    }
})();
