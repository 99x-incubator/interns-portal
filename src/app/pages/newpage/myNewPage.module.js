(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.myNewPage', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.myNewPage', {
          url: '/myNewPage',
          templateUrl: 'app/pages/newpage/newpage.html',
          title: 'My New Page',
          controller: 'ProfileCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            icon: 'ion-person',
            order: 800,
          },
        });
  }
  
})();
