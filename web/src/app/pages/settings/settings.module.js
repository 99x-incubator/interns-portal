(function() {
    'use strict';

    angular.module('BlurAdmin.pages.settings', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard.settings', {
                url: '/settings',
                templateUrl: 'app/pages/settings/settings.html',
                title: 'Change Password',
                controller: 'settingsCtrl'

            });
    }

})();
