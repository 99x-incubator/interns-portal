(function() {
    'use strict';

    angular.module('BlurAdmin.commonservice', [])
        .factory('commonService',commonService);

    /** @ngInject */
    function commonService($http, $timeout) {
        var service = {};
        var data = '';

        service.set = function(content) {
            console.log(content);
            data = content;
        };

        service.get = function() {
            console.log(data);
            return data;
        };

        return service;
    }
})();
