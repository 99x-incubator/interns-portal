(function() {
    'use strict';
    angular.module('BlurAdmin.pages', [
            'ui.router',
            'BlurAdmin.pages.sides',
            'BlurAdmin.pages.home',
            'BlurAdmin.pages.register',
            'BlurAdmin.pages.profile',
            'BlurAdmin.pages.viewReview',
            'BlurAdmin.pages.settings',
            'BlurAdmin.pages.viewtasks',
            'BlurAdmin.pages.addtasks',
            'BlurAdmin.pages.viewuser',
            'BlurAdmin.pages.interntasks',
            'BlurAdmin.pages.settings'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
        $urlRouterProvider.otherwise('/signin');
    }

})();
