(function () {
  'use strict';

  angular.module('BlurAdmin.pages.home.user', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.home.user', {
          url: '/user',
          templateUrl: 'app/pages/home/user/user.html',
          title: 'user'
        });
  }

})();
