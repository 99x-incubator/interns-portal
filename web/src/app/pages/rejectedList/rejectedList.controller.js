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
            // cognito
         //   AWSCognito.config.region = IG.cognitoConfigRegion;

         //   var poolData = {
        //        UserPoolId: IG.cognitoUserPoolId,
        //        ClientId: IG.cognitoClientId
        //    };

        //    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

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

          //  _.each(attributes, function(attribute) {
         //       attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attribute));
         //   });

         //   userPool.signUp(username, password, attributeList, null, function(err, result) {
          //      if (err) {
         //           console.log(err);
        //            return;
        //        }

      //      });
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
        $scope.viewdata = function(row) {
            $scope.rejectedIntern = angular.copy(row);
            var index = $scope.Interviewee.indexOf(row);
            $uibModal.open({
                animation: true,
                controller: 'ViewModalCtrl',
                templateUrl: 'app/pages/viewuser/viewusermodal/viewusermodal.html'
            }).result.then(function(data) {
                var status = {
                    'status': 'active'
                };
                $scope.rejectedIntern = angular.merge($scope.rejectedIntern, data, status);
                internSelected(index);
            });
        };
        
    }
})();
