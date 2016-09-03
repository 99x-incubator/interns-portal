(function() {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .filter('split', function() {
            return function(input, splitChar, splitIndex) {
                // do some bounds checking here to ensure it has that index
                return input.split(splitChar)[splitIndex];
            };
        })
        .controller('HomeCtrl', HomeCtrl);


    /** @ngInject */
    function HomeCtrl($http, $scope, printService) {

        $scope.navigationCollapsed = true;
        $scope.showCompose = function(subject, to, text) {
            composeModal.open({
                subject: subject,
                to: to,
                text: text
            });
        };

        // $http.get("https://owy0cw6hf0.execute-api.us-east-1.amazonaws.com/dev/getUsers",config);
        var config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        $http.get("https://owy0cw6hf0.execute-api.us-east-1.amazonaws.com/dev/getUsers")

        .then(function(response) {
            $scope.tabs = response.data;
            internsTimeline($scope.tabs);
            printService.print($scope.tabs);
        });

    }

    function internsTimeline(interns) {

        var container = document.getElementById('visualization');
        var data = [];
        angular.forEach(interns.records, function(item) {
            if (item.startdate !== null && item.enddate !== null) {
                data.push({
                    id: item.id,
                    content: item.firstname,
                    start: item.startdate,
                    end: item.enddate
                });

            }
        });
        // Create a DataSet (allows two way data-binding)
        var items = new vis.DataSet(data);

        // Configuration for the Timeline
        var options = {};

        // Create a Timeline
        var timeline = new vis.Timeline(container, items, options);
    }

})();
