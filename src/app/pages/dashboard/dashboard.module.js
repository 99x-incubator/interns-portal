/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.home', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.home', {
          url: '/home',
          templateUrl: 'app/pages/dashboard/dashboard.html',
          title: 'Dashboard',
          controller: "CurrentInternCtrl",
          controllerAs: "internCtrl",
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

})();
