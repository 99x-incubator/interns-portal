/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.home', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard.home', {
                url: '/home',
                templateUrl: 'app/pages/home/home.html',
                title: 'Dashboard',
                controller: "HomeCtrl",
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 0,
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
            })
            .state('dashboard.home.user', {
          url: '/:id',
          templateUrl: 'app/pages/home/user/user.html',
          title: 'Mail',
          controller: "UserCtrl",

        })



            ;
    }

})();
