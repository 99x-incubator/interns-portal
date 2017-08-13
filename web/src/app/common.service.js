(function() {
    'use strict';

    angular.module('BlurAdmin.commonservice', [])
        .factory('commonService',commonService);

    /** @ngInject */
    function commonService($http, $timeout) {
        var service = {};
        var data = '';

        service.set = function(content) {
            data = content;
        };

        service.get = function() {
            return data;
        };

        return service;
    }
})();
