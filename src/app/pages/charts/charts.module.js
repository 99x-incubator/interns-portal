/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.charts', [
      'BlurAdmin.pages.dashboard.charts.amCharts',
      'BlurAdmin.pages.dashboard.charts.chartJs',
      'BlurAdmin.pages.dashboard.charts.chartist',
      'BlurAdmin.pages.dashboard.charts.morris'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.charts', {
          url: '/charts',
          abstract: true,
          template: '<div ui-view></div>',
          title: 'Charts',
          sidebarMeta: {
            icon: 'ion-stats-bars',
            order: 150,
          },
        });
  }

})();
