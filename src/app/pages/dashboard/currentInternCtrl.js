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

    var vm = this;
    vm.navigationCollapsed = true;
    vm.showCompose = function(subject, to , text){
      composeModal.open({
        subject : subject,
        to: to,
        text: text
      })
    };




    var config ={headers:  {
        'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
        'Accept': 'application/json;odata=verbose',
        "X-Testing" : "testing"
    }
};

    $http.get("https://58f6jw3pl0.execute-api.us-east-1.amazonaws.com/dev/interns" ,config)
    .then(function(response) {
        vm.tabs = response.data;
        internsTimeline(vm.tabs);

    });

  };

  function internsTimeline(interns){
    //console.log(interns);

    var container = document.getElementById('visualization');
    var data=[];
    angular.forEach(interns.records, function(item){
        if (item.startdate != undefined && item.enddate != undefined){
          data.push({id: item.id, content: item.firstname, start: item.startdate, end:item.enddate});
                     console.log(item.firstname);
        }
    })


   // Create a DataSet (allows two way data-binding)
   var items = new vis.DataSet(data);

   // Configuration for the Timeline
   var options = {};

   // Create a Timeline
   var timeline = new vis.Timeline(container, items, options);


  };


})();
