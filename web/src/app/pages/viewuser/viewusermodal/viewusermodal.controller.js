(function() {
    'use strict';

    angular.module('BlurAdmin.pages.viewuser')
        .controller('ViewModalCtrl', ViewModalCtrl);

    /** @ngInject */
    function ViewModalCtrl($scope, $uibModalInstance) {

        $scope.data = {};

        $scope.category = ["Internship", "In-House program"];
        $scope.status=["Selected","Rejected"];
        $scope.submit = function() {
            $scope.submitted = true;
            $scope.stat="Selected";
            if ((($scope.interndata.cat.$dirty && $scope.interndata.startdate.$dirty && $scope.interndata.enddate.$dirty && $scope.interndata.comment.$dirty ) || $scope.submitted) && ($scope.interndata.cat.$error.required || $scope.interndata.startdate.$error.required || $scope.interndata.enddate.$error.required || $scope.interndata.comment.$error.required )) {
                //console.log("do nothing");

            } else {
                console.log($scope.data);
                $uibModalInstance.close($scope.data);
            }
        };
        $scope.addRejected=function(){
           $scope.submitted = true;
           $scope.data.stat="Rejected";
            if ((($scope.interndata.comment.$dirty && $scope.interndata.stat.$dirty ) || $scope.submitted) && ($scope.interndata.stat.$error.required  || $scope.interndata.comment.$error.required )) {
                //console.log("do nothing");

            } else {
                console.log($scope.data);
                $uibModalInstance.close($scope.data);
            }
        };  
        

    }

})();
