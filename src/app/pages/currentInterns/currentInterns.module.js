(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.currentInterns', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('currentInterns', {
          url: '/currentInterns',
          templateUrl: 'app/pages/interns/currentInterns.html',
          title: 'Current Interns',
          controller: 'ProfilePageCtrl',
          sidebarMeta: {
            order: 800,
          },
        });
  }

})();
