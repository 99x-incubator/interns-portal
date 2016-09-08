(function() {
    'use strict';

    angular.module('BlurAdmin.pages.addtasks').controller('AddTasksPageCtrl', AddTasksPageCtrl);

    function AddTasksPageCtrl($scope) {
        $scope.tasks = [{
            'title': 'Node'
        }, {
            'title': 'Angular'
        }, {
            'title': 'React'
        }, {
            'title': 'Bootstrap'
        }, {
            'title': 'Leadership'
        }];
    }
})();
