(function() {
    'use strict';

    angular.module('BlurAdmin.pages.rejectedList', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard.rejected', {
                url: '/rejected',
                title: 'Rejected List',
                templateUrl: 'app/pages/rejectedList/rejectedList.html',
                controller: 'RejectedCtrl',
                sidebarMeta: {
                    icon: 'ion-person-stalker',
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
                    internviewees : ["$http", '$rootScope',
                        function($http, $rootScope) {
                            return $http.get(IG.api + 'users/stat/Rejected')
                                .then(function(response) {
                                    return response.data.data.Items;
                                });
                        }
                    ]
                }
            });
    }

})();
