(function () {
    'use strict';

    angular.module('BlurAdmin.pages.viewtasks', ['ngDragDrop', 'moment-picker'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard.viewtasks', {
                url: '/tasks',
                title: 'Tasks',
                templateUrl: 'app/pages/tasks/viewtasks.html',
                controller: 'ViewTasksPageCtrl',
                sidebarMeta: {
                    icon: 'ion-ios-list',
                    order: 800,
                },
                data: {
                    permissions: {
                        only: ['AUTHORIZED'],
                        redirectTo: function () {
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
                    user: ["$http", '$rootScope',
                        function ($http, $rootScope) {

                            if ($rootScope.adminLoggedIn && localStorage.isAdmin) {
                                return $http.get(IG.api + 'users/user/' + $rootScope.adminSerachingUserId)
                                    .then(function (response) {
                                        return response.data.data.Item;
                                    });
                            } else {
                                return $http.get(IG.api + 'users/user/' + JSON.parse(localStorage.username))
                                    .then(function (response) {
                                        return response.data.data.Item;
                                    });
                            }
                        }
                    ]

                }
            });
    }

})();
