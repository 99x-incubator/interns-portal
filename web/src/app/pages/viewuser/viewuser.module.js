(function() {
    'use strict';

    angular.module('BlurAdmin.pages.viewuser', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard.viewuser', {
                url: '/viewuser',
                title: 'View Interviewees',
                templateUrl: 'app/pages/viewuser/viewuser.html',
                controller: 'ViewCtrl',
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
                }
            });
    }

})();
