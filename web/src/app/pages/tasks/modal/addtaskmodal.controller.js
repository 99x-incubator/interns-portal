(function() {
    'use strict';

    angular.module('BlurAdmin.pages.addtasks')
        .controller('AddModalCtrl', AddModalCtrl);

    /** @ngInject */
    function AddModalCtrl($scope, $uibModalInstance,task) {
        $scope.task=task;
        
        $scope.delete = function(task) {
            $uibModalInstance.close($scope.task);
        };
    }

})();
