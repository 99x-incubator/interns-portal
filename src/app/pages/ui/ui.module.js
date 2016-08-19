/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.ui', [
    'BlurAdmin.pages.dashboard.ui.typography',
    'BlurAdmin.pages.dashboard.ui.buttons',
    'BlurAdmin.pages.dashboard.ui.icons',
    'BlurAdmin.pages.dashboard.ui.modals',
    'BlurAdmin.pages.dashboard.ui.grid',
    'BlurAdmin.pages.dashboard.ui.alerts',
    'BlurAdmin.pages.dashboard.ui.progressBars',
    'BlurAdmin.pages.dashboard.ui.notifications',
    'BlurAdmin.pages.dashboard.ui.tabs',
    'BlurAdmin.pages.dashboard.ui.slider',
    'BlurAdmin.pages.dashboard.ui.panels',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.ui', {
          url: '/ui',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'UI Features',
          sidebarMeta: {
            icon: 'ion-android-laptop',
            order: 200,
          },
        });
  }

})();
