(function () {
  'use strict';

  angular.module('BlurAdmin.signin', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('signin', {
          url: '/signin',
          templateUrl: 'app/pages/signin/signin.html',
          controller: 'SignInCtrl',

          controllerAs: 'vm'


        })

        .state('forgotpwd', {
          url: '/signin/forgot',
          templateUrl: 'app/pages/signin/forgotpwd.html',
          controller: 'SignInCtrl',
          controllerAs: 'vm'


        })
        ;
  };




})();
