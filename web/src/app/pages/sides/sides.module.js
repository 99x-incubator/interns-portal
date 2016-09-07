/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.sides', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/pages/sides/sides.html',
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
                // ,
                // resolve: {
                //     initialData: function(commonService, AuthenticationService) {
                //         AuthenticationService.setUser(commonService.get());
                //         return;
                //     }
                // }

            });
    }

})();
