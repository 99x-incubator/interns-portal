(function() {
    'use strict';

    angular.module('BlurAdmin.printService', [])
        .factory('printService', printService);

    /** @ngInject */
    function printService($http, $timeout) {
        var service = {};
        service.print = function(content) {
            //console.log(content);
        };

        return service;
    }
})();
