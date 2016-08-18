(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.addReview', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('addReview', {
          url: '/addReview',
          templateUrl: 'app/pages/review/addReview.html',
          title: 'Add Review',
          sidebarMeta: {
            order: 800,
          },
        });
  }

})();
