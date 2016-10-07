(function() {
    'use strict';

    angular.module('BlurAdmin.pages.addtasks', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard.addtasks', {
                url: '/addtasks',
                title: 'Add Tasks',
                templateUrl: 'app/pages/tasks/addtasks.html',
                controller: 'AddTasksPageCtrl',
                sidebarMeta: {
                    icon: 'ion-ios-list',
                    order: 800,
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
                },
                resolve: {
                    tasks: ["$http", '$rootScope',
                        function($http, $rootScope) {
                            return $http.get(IG.api + 'tasks/allTask')
                                .then(function(response) {
                                    return response.data.data.Items;
                                });
                        }
                    ]
                }
            });
    }

})();
