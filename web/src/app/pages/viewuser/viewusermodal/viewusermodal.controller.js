(function() {
    'use strict';

    angular.module('BlurAdmin.pages.viewuser')
        .controller('ViewModalCtrl', ViewModalCtrl);

    /** @ngInject */
    function ViewModalCtrl($scope, $uibModalInstance) {

        $scope.data = {};

        $scope.category = ["Internship", "In-House program"];
        $scope.submit = function() {
            $scope.submitted = true;
            if ((($scope.interndata.cat.$dirty && $scope.interndata.startdate.$dirty && $scope.interndata.enddate.$dirty) || $scope.submitted) && ($scope.interndata.cat.$error.required || $scope.interndata.startdate.$error.required || $scope.interndata.enddate.$error.required)) {
                //console.log("do nothing");
            } else {
                $uibModalInstance.close($scope.data);
            }
        };

    }

})();
