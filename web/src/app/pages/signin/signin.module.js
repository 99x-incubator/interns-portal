(function() {
    'use strict';

    angular.module('BlurAdmin.signin', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('signin', {
                url: '/signin',
                templateUrl: 'app/pages/signin/signin.html',
                controller: 'SignInCtrl'

            })


        .state('forgotpwd', {
            url: '/signin/forgot',
            templateUrl: 'app/pages/signin/forgotpwd.html',
            controller: 'SignInCtrl'

        })

        .state('confirm', {
            url: '/signin/confirm',
            templateUrl: 'app/pages/signin/confirm.html',
            controller: 'SignInCtrl'


        });
    }
})();
