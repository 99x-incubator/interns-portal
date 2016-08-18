(function () {
  'use strict';

  angular.module('BlurAdmin.signin', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('signin', {
          url: '/signin',
          templateUrl: 'app/pages/login/login.html',
          // Controller: 'SignInCtrl',
          // controllerAs: 'vm',

        })
        ;
  }


})();
