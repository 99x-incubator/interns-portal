(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.action', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.action', {
          url: '/form',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Action',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 250,
          },
          data: {
          permissions: {
            only: ['ADMIN'],
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
        })

        .state('dashboard.action.permission', {
          url: '/users',
          templateUrl: 'app/pages/form/action/permission.html',
          title: 'New Intern',
          sidebarMeta: {
            order: 100,
          },
          data: {
          permissions: {
            only: ['ADMIN'],
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
        })

        ;
  }
})();
