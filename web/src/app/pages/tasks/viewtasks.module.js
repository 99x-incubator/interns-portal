(function () {
  'use strict';

  angular.module('BlurAdmin.pages.viewtasks', ['ngDragDrop','moment-picker'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.viewtasks', {
          url: '/mytasks',
          title: 'My Tasks',
          templateUrl: 'app/pages/tasks/viewtasks.html',
          controller: 'ViewTasksPageCtrl',
          sidebarMeta: {
            icon: 'ion-ios-list',
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
