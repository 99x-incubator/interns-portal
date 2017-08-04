(function() {
    'use strict';

    angular.module('BlurAdmin.pages.rejectedList')
        .controller('RejectedCtrl', RejectedCtrl);

    /** @ngInject */
    function RejectedCtrl($scope, $http, $uibModal, toastr,internviewees) {

        $scope.smartTablePageSize = 10;

        $scope.dataInterviewee = [];

        $scope.dataInterviewee = (internviewees);
        $scope.Interviewee = [].concat($scope.dataInterviewee);

        $scope.rejectedIntern = {};

        var signUp = function(email, username, password) {
            var attributeList = [];

            var attributes = [{
                Name: 'email',
                Value: email
            }, {
                Name: 'profile',
                Value: '/'
            }, {
                Name: 'name',
                Value: 'INTERN'
            }];

        };
      var internSelected = function(index) {
          var intern = $scope.rejectedIntern;
           $http.post(IG.api + 'users/user', $scope.rejectedIntern).then(function(response) {
               if ((response.data.status) === "success") {
                    toastr.success("Rejected intern added successfully");
                    $scope.Interviewee.splice(index, 1);
                    signUp(intern.email,intern.email,"99Xt@intern");
                } else {
                    toastr.error("Unable to add new intern");
                }

            });
        };         
    }
})();
