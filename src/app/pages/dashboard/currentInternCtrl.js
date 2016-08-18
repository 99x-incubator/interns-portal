(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
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




    $http.get("https://58f6jw3pl0.execute-api.us-east-1.amazonaws.com/dev/")
    .then(function(response) {
        vm.tabs = response.data;
        vm.tabs = response.data.records;
        console.log(vm.tabs);

    });


    /*vm.tabs = [
      {
        "id": "4563faass",
        "name": "Nasta Linnie",
        "subject": "Great text",
        "date": "2015-08-28T07:57:09",
        "pic": "img/Nasta.png",
        "email": "petraramsey@mail.com",
        "attachment": "poem.txt",
        "position": "Great Employee",
        "tag": "friend",
        "labels": ['inbox']
      },
      {
        "id": "4563fdfvd",
        "name": "Nasta Linnie",
        "subject": "Lores ipsum",
        "date": "2015-11-19T03:30:45",
        "important": false,
        "pic": "img/Nasta.png",
        "email": "petraramsey@mail.com",
        "position": "Great Employee",
        "tag": "study",
        "labels": ['inbox']
      },
      {
        "id": "4563zxcss",
        "name": "Nasta Linnie",
        "subject": "Lores ipsum",
        "date": "2015-10-19T03:30:45",
        "important": false,
        "pic": "img/Nasta.png",
        "email": "petraramsey@mail.com",
        "position": "Great Employee",
        "tag": "work",
        "labels": ['sent', 'important']
      },
      {
        "id": "8955sddf",
        "name": "Nick Cat",
        "subject": "New Design",
        "date": "2015-05-05T12:59:45",
        "pic": "img/Nick.png",
        "email": "barlowshort@mail.com",
        "position": "Graphical designer",
        "attachment": "design.psd",
        "tag": "work",
        "labels": ['inbox']
      },
      {
        "id": "8955sdfcc",
        "name": "Nick Cat",
        "subject": "Gift card",
        "date": "2015-07-18T10:19:01",
        "pic": "img/Nick.png",
        "email": "barlowshort@mail.com",
        "position": "Graphical designer",
        "tag": "study",
        "labels": ['inbox']
      },
      {
        "id": "8955asewf",
        "name": "Nick Cat",
        "subject": "Some news",
        "date": "2015-09-23T03:04:10",
        "pic": "img/Nick.png",
        "email": "barlowshort@mail.com",
        "position": "Graphical designer",
        "tag": "work",
        "labels": ['inbox', 'important']
      },
      {
        "id": "2334uudsa",
        "name": "Kostya Danovsky",
        "subject": "Street Art",
        "date": "2015-11-22T10:05:09",
        "pic": "img/Kostya.png",
        "email": "schwart@mail.com",
        "position": "Technical Chef",
        "attachment": "file.doc",
        "tag": "family",
        "labels": ['inbox', 'important']
      },
      {
        "id": "2334aefvv",
        "name": "Kostya Danovsky",
        "subject": "New product",
        "date": "2015-06-22T06:26:10",
        "pic": "img/Kostya.png",
        "email": "schwart@mail.com",
        "position": "Technical Chef",
        "tag": "family",
        "labels": ['inbox', 'important']
      },
      {
        "id": "2334cvdss",
        "name": "Kostya Danovsky",
        "subject": "Old product",
        "date": "2015-06-22T06:26:10",
        "pic": "img/Kostya.png",
        "email": "schwart@mail.com",
        "position": "Technical Chef",
        "tag": "study",
        "labels": ['trash']
      },
      {
        "id": "8223xzxfn",
        "name": "Andrey Hrabouski",
        "subject": "Skype moji",
        "date": "2015-07-16T06:47:53",
        "pic": "img/Andrey.png",
        "email": "lakeishaphillips@mail.com",
        "position": "Mobile Developer",
        "tag": 'family',
        "labels": ['trash']
      },
      {
        "id": "8223sdffn",
        "name": "Andrey Hrabouski",
        "subject": "My App",
        "date": "2015-06-20T07:05:02",
        "pic": "img/Andrey.png",
        "email": "lakeishaphillips@mail.com",
        "position": "Mobile Developer",
        "tag": 'family',
        "labels": ['spam']
      },
      {
        "id": "9391xdsff",
        "name": "Vlad Lugovsky",
        "subject": "Cool",
        "date": "2015-03-31T11:52:58",
        "pic": "img/Vlad.png",
        "email": "carlsongoodman@mail.com",
        "position": "Fullstack man",
        "tag": "study",
        "labels": ['draft']
      },
      {
        "id": "8223xsdaa",
        "name": "Andrey Hrabouski",
        "subject": "Car rent",
        "date": "2015-02-25T10:58:58",
        "pic": "img/Andrey.png",
        "email": "lakeishaphillips@mail.com",
        "position": "Mobile Developer",
        "tag": "family",
        "labels": ['draft']
      },
      {
        "id": "9391xdsff",
        "name": "Vlad Lugovsky",
        "subject": "What next",
        "date": "2015-03-31T11:52:58",
        "pic": "img/Vlad.png",
        "email": "carlsongoodman@mail.com",
        "position": "Fullstack man",
        "tag": "study",
        "labels": ['sent']
      }
    ];
    */
  }


})();
