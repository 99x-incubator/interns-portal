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

  function SignOutCtrl($scope) {
    console.log('Logout code');
  }

})();
