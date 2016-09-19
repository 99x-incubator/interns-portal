(function() {
    'use strict';

    angular.module('BlurAdmin.pages.register', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard.register', {
                url: '/register',
                template: '<ui-view></ui-view>',
                abstract: true,
                title: 'Registration',
                sidebarMeta: {
                    icon: 'ion-compose',
                    order: 950,
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

        .state('dashboard.register.intern', {
            url: '/intern',
            templateUrl: 'app/pages/register/internReg.html',
            title: 'New Intern',
            controller: 'internRegCtrl',
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

        .state('dashboard.register.supervisor', {
            url: '/supervisor',
            templateUrl: 'app/pages/register/internReg.html',
            title: 'New Supervisor',
            controller: 'internRegCtrl',
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

        .state('dashboard.register.interviewee', {
            url: '/intervieweedetails',
            templateUrl: 'app/pages/register/interviewee.html',
            title: 'Interviewee Details',
            controller: '',
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
        });

    }
})();
