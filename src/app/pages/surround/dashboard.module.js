/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/pages/surround/surround.html',
          redirectTo: 'dashboard.home',
          data: {
          permissions: {
            only: ['AUTHORIZED'],
            redirectTo: function() {
              return {
                state: 'signin',
                options: {
                  reload: true
                }
              };
            }
          }
        }

        });
  }

})();
