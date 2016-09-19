/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.viewuser')
        .controller('ViewCtrl', ViewCtrl);

    /** @ngInject */
    function ViewCtrl($scope, $http, $uibModal, toastr) {

        $scope.smartTablePageSize = 10;

        $scope.dataInterviewee = [];

        var interviewed = {
            'id': "interviewed"
        };
        var getInterviewed = function() {
            $http.post(IG().local + 'users/getInterns', interviewed).then(function(response) {
                $scope.dataInterviewee = (response.data.data.Items);
            });
            $scope.Interviewee = [].concat($scope.dataInterviewee);
        }
        getInterviewed();
        $scope.selectedIntern = {};

        var internSelected = function(index) {
            $http.post(IG().local + 'users/createUser', $scope.selectedIntern).then(function(response) {
                if ((response.data.status) === "success") {
                    toastr.success("New Intern added successfully");
                    $scope.Interviewee.splice(index, 1);
                } else {
                    toastr.error("Unable to add new intern");
                }

            });
        }
        $scope.viewdata = function(row) {
            $scope.selectedIntern = angular.copy(row);
            var index = $scope.Interviewee.indexOf(row);
            $uibModal.open({
                animation: true,
                controller: 'ViewModalCtrl',
                templateUrl: 'app/pages/viewuser/viewusermodal/viewusermodal.html'
            }).result.then(function(data) {
                var status = {
                    'status': 'active'
                };
                $scope.selectedIntern = angular.merge($scope.selectedIntern, data, status);
                internSelected(index);
            });
        };
    }
})();
