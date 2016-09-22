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
    function HomeCtrl($http, $scope, printService, $state) {

        $scope.user = {};
        $state.transitionTo('dashboard.home.users');
        $scope.navigationCollapsed = true;
        $scope.showCompose = function(subject, to, text) {
            composeModal.open({
                subject: subject,
                to: to,
                text: text
            });
        };

        $scope.getUserProfile = function(key) {
            $state.go('dashboard.home.user');
            $scope.user = $scope.tabs[key];
        };

        var config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        //http proxy was added (find in server gulp file.)
        $http.post(IG.api + 'users/getInterns', { id : "active"} )
            .then(function(response) {
                $scope.tabs = response.data.data.Items;
                internsTimeline($scope.tabs);
                printService.print($scope.tabs);
            });

    }

    function internsTimeline(interns) {

        var container = document.getElementById('visualization');
        var data = [];
        angular.forEach(interns, function(item) {
            // temp solution for error of startdate doesn't exist.
            if (item.startdate != undefined) {
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
