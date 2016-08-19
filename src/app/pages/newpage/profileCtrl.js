
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.myNewPage')
    .controller('ProfileCtrl', ProfileCtrl);

  /** @ngInject */
  function ProfileCtrl($scope, fileReader, $filter, $uibModal) {
    var vm= this;

    vm.data={};
    vm.isConformPasswords = function () {
      return vm.data.conformpassword && vm.data.inputpassword ==vm.data.conformpassword;
      };


      vm.signIn = function () {

         AWSCognito.config.region = 'us-west-2';
          
           var authenticationData = {
            Username : 'niroshanr',
            Password : '7870@VvV99XT@se',
        };
        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        var poolData = { UserPoolId : 'us-west-2_Wx15G37Co',
            ClientId : '50s9gm3dpvki6bsjhj9eijgsou'
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        var userData = {
            Username : 'niroshanr',
            Pool : userPool
        };
        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log('access token + ' + result.getAccessToken().getJwtToken());
            },

            onFailure: function(err) {
                alert(err);
            },

        });

      }
    vm.signUp = function () {


     AWSCognito.config.region = 'us-west-2'; //This is required to derive the endpoint


    var poolData = { UserPoolId : 'us-west-2_Wx15G37Co',
        ClientId : '50s9gm3dpvki6bsjhj9eijgsou'
    };
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : 'niroshanrd.13@cse.mrt.ac.lk'
    };

    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);


    attributeList.push(attributeEmail);


    userPool.signUp('niroshanr', '7870@VvV99XT@se', attributeList, null, function(err, result){
        if (err) {
            alert(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
  };

    $scope.picture = $filter('profilePicture')('Nasta');

    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();

    };

    $scope.socialProfiles = [
      {
        name: 'Facebook',
        icon: 'socicon-facebook'
      },
      {
        name: 'Twitter',
        icon: 'socicon-twitter'
      },
      {
        name: 'Google',
        icon: 'socicon-google'
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
      },
      {
        name: 'Dribbble',
        icon: 'socicon-dribble'
      },
      {
        name: 'Behance',
        icon: 'socicon-behace'
      }
    ];

    $scope.unconnect = function (item) {
      item.href = undefined;
    };

    $scope.showModal = function (item) {
      $uibModal.open({
        animation: false,
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

    $scope.switches = [true, true, false, true, true, false];
  }

})();
