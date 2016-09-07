(function() {
    'use strict';

    angular.module('BlurAdmin.pages.viewtasks').controller('ViewTasksPageCtrl', ViewTasksPageCtrl);

    function ViewTasksPageCtrl($scope, $timeout) {
        $scope.list1 = [{
            'title': 'Node'
        }, {
            'title': 'Angular'
        }, {
            'title': 'React'
        },{
            'title': 'Bootstrap'
        },{
            'title': 'Leadership'
        }];
        $scope.list4 = [];

        $scope.hideMe = function() {
            return $scope.list4.length > 0;
        };
        print($scope.list4);
        $scope.savetasks = function(){
          print($scope.list4);
        };

    }

    function print($print) {
        console.log($print);
    }
})();
