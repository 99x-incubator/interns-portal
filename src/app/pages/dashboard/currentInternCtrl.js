(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.home')
  .filter('split', function() {
       return function(input, splitChar, splitIndex) {
           // do some bounds checking here to ensure it has that index
           return input.split(splitChar)[splitIndex];
       }
   })
  .controller('CurrentInternCtrl', CurrentInternCtrl);


  /** @ngInject */
  function CurrentInternCtrl($http) {

    var container = document.getElementById('visualization');

  // Create a DataSet (allows two way data-binding)
  var items = new vis.DataSet([
    {id: 1, content: 'item 1', start: '2013-04-20'},
    {id: 2, content: 'item 2', start: '2013-04-14'},
    {id: 3, content: 'item 3', start: '2013-04-18'},
    {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
    {id: 5, content: 'item 5', start: '2013-04-25'},
    {id: 6, content: 'item 6', start: '2013-04-27'}
  ]);

  // Configuration for the Timeline
  var options = {};

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);

    var vm = this;
    vm.navigationCollapsed = true;
    vm.showCompose = function(subject, to , text){
      composeModal.open({
        subject : subject,
        to: to,
        text: text
      })
    };





    $http.get("https://58f6jw3pl0.execute-api.us-east-1.amazonaws.com/dev/")
    .then(function(response) {
        vm.tabs = response.data;

        console.log(vm.tabs);

    });

  }


})();
