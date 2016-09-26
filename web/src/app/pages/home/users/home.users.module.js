(function () {
  'use strict';

  angular.module('BlurAdmin.pages.home.users', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.home.users', {
          url: '/users',
          templateUrl: 'app/pages/home/users/users.html',
          title: 'users'
        });
  }

})();
