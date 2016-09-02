/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.profile')
    .controller('ProfilePageCtrl', ProfilePageCtrl);

  /** @ngInject */
  function ProfilePageCtrl($scope, fileReader, $filter, $http, toastr, $uibModal,AuthenticationService,editableOptions,editableThemes) {
    $scope.picture = $filter('profilePicture')('Nasta');



    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();

    };

    var getDetails = function(){
      var name = AuthenticationService.getUser();

      var details = {
          "id": name
      }

      var config = {
                 headers : {
                     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                 }
             };
      $http.post('https://owy0cw6hf0.execute-api.us-east-1.amazonaws.com/dev/getUser', details, config)
       .then(function(response) {
         $scope.vm.data = {};

         console.log(response.data.Item);
         //console.log(vm.data.firstname);
        $scope.vm.data = response.data.Item;
        //  $scope.vm.data.firstname = response.data.Item.firstname;
        //  $scope.vm.data.lastname = response.data.Item.lastname;
        //  $scope.vm.data.fullname = response.data.Item.fullname;
        //  $scope.vm.data.nic = response.data.Item.nic;
        // //  //$scope.vm.data.confirmpassword = response.data.Item.confirmpassword;
        //  $scope.vm.data.email = response.data.Item.email;
        //  $scope.vm.data.mobile = response.data.Item.mobile;
        //  $scope.vm.data.tel = response.data.Item.tel;
        //  $scope.vm.data.address = response.data.Item.address;
        //  $scope.vm.data.goal = response.data.Item.goals;



         console.log(response.data.Item.social);
         if (response.data.Item.social == undefined){
           $scope.socialProfiles = [
             {
               name: 'Facebook',
               icon: 'socicon-facebook'
             },
             {
               name: 'LinkedIn',
               icon: 'socicon-linkedin'
             },
             {
               name: 'GitHub',
               icon: 'socicon-github'
             },
             {
               name: 'StackOverflow',
               icon: 'socicon-stackoverflow'
             }
           ];
         }
         else {
           $scope.socialProfiles = response.data.Item.social;
         }

         if (response.data.Item.techs == undefined){
           $scope.techs = [
             {
               "id": 1,
               "name": "Angular"

             },
             {
               "id": 2,
               "name": "React"

             }

           ];
         }
         else {
           $scope.techs = response.data.Item.techs;
         }

      });
    };


    getDetails();

    $scope.update = function(){
      var techs = JSON.parse(JSON.stringify($scope.techs));
      // console.log(techs);
      // $scope.vm.data = {
      //   "techs" : techs
      // };
      var social = JSON.parse(JSON.stringify($scope.socialProfiles));
      // $scope.vm.data = {
      //     "social" : social
      //
      // };
      console.log("goals");
      if ($scope.vm.data.goals == undefined){
        $scope.vm.data.goals = "future goals here";

      }
      console.log($scope.vm.data.goals);
      var sc = JSON.stringify($scope.socialProfiles);
      var name = AuthenticationService.getUser();
      console.log(sc);

      var internDetails = {
        "id" : name,
        "firstname" : $scope.vm.data.firstname ,
        "lastname" : $scope.vm.data.lastname ,
        "fullname" : $scope.vm.data.fullname,
        "NIC" : $scope.vm.data.nic,
        "password" : $scope.vm.data.confirmpassword,
        "email" : $scope.vm.data.email,
        "mobile" : $scope.vm.data.mobile,
        "tel" : $scope.vm.data.tel,
        "address" : $scope.vm.data.address,
        "goals" : $scope.vm.data.goals,
        "social" : social,
        "techs" : techs

      };

      //console.log(internDetails);

      var config = {
                 headers : {
                     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                 }
             };
      $http.post('https://owy0cw6hf0.execute-api.us-east-1.amazonaws.com/dev/updateUser', internDetails, config)
       .then(function(response) {

         console.log(JSON.stringify(internDetails));
         console.log(response);
         if (response.data == "It worked!"){
           toastr.success('Your information has been saved successfully!');
         }
         else {
           toastr.error(response.data);
         }

      });




      ////////////////////////////////////////////////////////////////////////////////
    };


    $scope.socialProfiles = [
      {
        name: 'Facebook',
        icon: 'socicon-facebook'
      },
      {
        name: 'LinkedIn',
        icon: 'socicon-linkedin'
      },
      {
        name: 'GitHub',
        icon: 'socicon-github'
      },
      {
        name: 'StackOverflow',
        icon: 'socicon-stackoverflow'
      }
    ];

    $scope.techs = [
      {
        "id": 1,
        "name": "Angular"

      },
      {
        "id": 2,
        "name": "React"

      }

    ];

    $scope.unconnect = function (item) {
      item.href = undefined;
    };

    $scope.showModal = function (item) {
      $uibModal.open({
        animation: true,
        controller: 'ProfileModalCtrl',
        templateUrl: 'app/pages/profile/profileModal.html'
      }).result.then(function (link) {
          item.href = link;
        });
    };

    $scope.getFile = function () {
      fileReader.readAsDataUrl($scope.file, $scope)
          .then(function (result) {
            $scope.picture = result;
          });
    };



    $scope.showGroup = function(user) {
      if(tech.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: tech.group});
        return selected.length ? selected[0].text : 'Not set';
      } else return 'Not set'
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if(tech.status) {
        selected = $filter('filter')($scope.statuses, {value: tech.status});
      }
      return selected.length ? selected[0].text : 'Not set';
    };


    $scope.removeUser = function(index) {
      $scope.techs.splice(index, 1);
    };

    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.techs.length+1,
        name: '',
        status: null,
        group: null
      };
      $scope.techs.push($scope.inserted);
    };

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';



    $scope.switches = [true, true, false, true, true, false];
  }

})();
