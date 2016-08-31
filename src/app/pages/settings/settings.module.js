(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.settings', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.settings', {
          url: '/settings',
          templateUrl: 'app/pages/settings/settings.html',
          title: 'Settings',
          controller: 'settingsCtrl',
          controllerAs: 'vm'
          // sidebarMeta: {
          //   icon: 'ion-person',
          //   order: 800,
          // },
        });
  }

})();
