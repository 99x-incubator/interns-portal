(function() {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .filter('split', function() {
            return function(input, splitChar, splitIndex) {
                return input.split(splitChar)[splitIndex];
            };
        })
        .controller('HomeCtrl', HomeCtrl);


    /** @ngInject */
    function HomeCtrl($http, $scope, printService, $state,userService) {

        $scope.setUserId= function(id){
          userService.setId(id);
          $state.go('dashboard.user');
        };



        $scope.navigationCollapsed = true;
        $scope.showCompose = function(subject, to, text) {
            composeModal.open({
                subject: subject,
                to: to,
                text: text
            });
        };




        $scope.getUser =function(){
        var details = {
            "id": userService.getId()
        };

        $http({
            method: 'POST',
            url: IG().api + '/dev/users/getUser',
            headers: {
                'Content-Type': 'application/json'
            },
            data: details
        }).then(function successCallback(response) {

                $scope.data = response.data.Item;
            });


          };






        var config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        console.log( IG().local);
        //http proxy was added (find in server gulp file.)

        $http.get(IG().local + 'users/getUsers')
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
            if (item.startdate != null && item.enddate != null) {
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
