/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.profile', {
          url: '/profile',
          title: 'Profile',
          templateUrl: 'app/pages/profile/profile.html',
          controller: 'ProfilePageCtrl',
          sidebarMeta: {
            icon: 'ion-person',
            order: 800,
          },
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
