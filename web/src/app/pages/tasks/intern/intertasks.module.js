(function() {
    'use strict';

    angular.module('BlurAdmin.pages.interntasks', ['ngDragDrop', 'moment-picker', 'ngScrollbars'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, ScrollBarsProvider) {
        $stateProvider
            .state('dashboard.internstasks', {
                url: '/internstasks',
                title: 'Interns Tasks',
                templateUrl: 'app/pages/tasks/intern/internstasks.html',
                controller: 'InternsTasksPageCrl',
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

        ScrollBarsProvider.defaults = {
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: true // enable scrolling buttons by default
            },
            axis: 'y', // enable 2 axis scrollbars by default
            autoHideScrollbar: false,
            theme: 'dark',
            advanced: {
                updateOnContentResize: true
            }
        };

    }

})();
