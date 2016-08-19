(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.currentInterns', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.currentInterns', {
          url: '/current',
          templateUrl: 'app/pages/currentInterns/currentInterns.html',
          title: 'Current Interns',
          controller: 'ProfilePageCtrl',

          
        });
  }

})();
