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
    function HomeCtrl($http, $scope, printService, $state, interns) {

        $scope.user = {};
        $scope.tabs = interns;

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
            $scope.user = $scope.tabs[key];
            $state.go('dashboard.home.user');
        };

         internsTimeline($scope.tabs);
    }

    function internsTimeline(interns) {

        var container = document.getElementsByClassName('js-visualization')[0];

        var data = [];
        // console.log(interns);
        // console.log(container);
        angular.forEach(interns, function(item) {
            // temp solution for error of startdate doesn't exist.
            if (item.startdate) {
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
