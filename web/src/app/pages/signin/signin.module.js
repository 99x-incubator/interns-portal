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
            url: '/signin/verify',
            templateUrl: 'app/pages/signin/verify.html',
            controller: 'SignInCtrl'


        })

        .state('changePassword', {
            url: '/signin/change',
            templateUrl: 'app/pages/signin/change_password.html',
            controller: 'SignInCtrl'


        });

    }
})();
