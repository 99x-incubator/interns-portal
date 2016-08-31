(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.form')
      .controller('internRegCtrl',internRegCtrl);

  /** @ngInject */
  function internRegCtrl($scope, $http) {
   var vm = this;

   vm.generalInfo ={};

   vm.contactInfo ={};
   vm.eduInsInfo ={};
   vm.internshipInfo ={};



   vm.submitform= function(){


    vm.createNewIntern(vm.generalInfo,vm.contactInfo,vm.eduInsInfo,vm.internshipInfo);
    vm.signUp(vm.contactInfo.email,vm.contactInfo.email,"99Xt@intern");


   };

   vm.createNewIntern= function(general,contact,internship){

     // create json for store user dataEmail
     var data={
        "id": contact.email,
        "username": "new",
        "firstname" :vm.generalInfo.firstName,
        "lastname":vm.generalInfo.LastName,
        "personaldetails":
        {"mobile":vm.contactInfo.mobile,
        "address":vm.contactInfo.address,
        "nic":vm.generalInfo.nic,
        "skypeid":" ",
        "email":contact.email,
        "facebookid":" "},
        "startdate":convertDate(String(vm.internshipInfo.startDate)),
        "enddate":convertDate(String(vm.internshipInfo.endDate)),
        "projects":{}
     };




     var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
     $http.post('https://58f6jw3pl0.execute-api.us-east-1.amazonaws.com/dev/', data, config)
      .then(function(response) {

        console.log(JSON.stringify(data));
        ;


         console.log(response);

     });


   };


   vm.arePersonalInfoPasswordsEqual = function () {
     return vm.personalInfo.confirmPassword && vm.personalInfo.password == vm.personalInfo.confirmPassword;
   };






   vm.signUp = function (email,username,password) {


    AWSCognito.config.region = 'us-east-1'; //This is required to derive the endpoint

   var poolData = { UserPoolId : 'us-east-1_axj5uw9kj',
       ClientId : '1blbmqslmk42i22u1258i7gmgi'
   };
   var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

   var attributeList = [];

   var dataEmail = {
       Name : 'email',
       Value : email
   };

   var dataRole ={
     Name: 'role',
     value: 'intern'
   }

   var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
   var attributeRole =new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataRole);


   attributeList.push(attributeEmail);
   attributeList.push(attributeRole);


   userPool.signUp(username, password, attributeList, null, function(err, result){
       if (err) {
           alert(err);
           return;
       }
    //   cognitoUser = result.user;
      // console.log('user name is ' + cognitoUser.getUsername());
   });
 };




  };

function convertDate(input) {
    var date = input.split(" ");

    var mnths = {
        Jan:"01", Feb:"02", Mar:"03", Apr:"04", May:"05", Jun:"06",
        Jul:"07", Aug:"08", Sep:"09", Oct:"10", Nov:"11", Dec:"12"
    };

      return  [date[3], mnths[date[1]], date[2] ].join("-");
 }





})();
