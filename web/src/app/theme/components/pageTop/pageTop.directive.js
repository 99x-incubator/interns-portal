/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .controller('SignOutCtrl',SignOutCtrl)
      .directive('pageTop', pageTop);

  /** @ngInject */
  function pageTop() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
      controller: 'SignOutCtrl',
      controllerAs: 'vm',
    };
  }

  function SignOutCtrl($scope,AuthenticationService) {
    console.log('Logout code');

    $scope.signOut = function(){
      AuthenticationService.setLoggedIn(false);
      console.log('inside signOut');
    };

    $scope.username = AuthenticationService.getUser();
  }

})();
