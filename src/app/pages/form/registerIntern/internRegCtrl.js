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
     console.log(vm.generalInfo);
      console.log(vm.contactInfo);
       console.log(vm.eduInsInfo);
        console.log(vm.internshipInfo);

     //vm.signUp(vm.contactInfo.email,vm.generalInfo.firstname,"gUtyh@gsduUGD^86ugygsd>iudh");

   };

   vm.createNewIntern= function(general,contact,internship){

     // create json for store user dataEmail
     var data={
        "id": general.firstname,
        "username": "niroshanr",
   "firstname" : "Niroshan",
   "lastname":"Ranapathi",
   "personaldetails":{"mobile":"0772080907",
  "address":"No 61, Summer Terace, Kananthippala, Kuliyapitiya",
   "nic":"VV",
   "skypeid":"niroshan8889",
   "email":"niroshanrd.13@cse.mrt.ac.lk",
    "facebookid":"https://www.facebook.com/niroshan.nrsh"},
   "startdate":"2016-08-01",
   "enddate":"2017-01-06",
   "projects":{}

     };


     var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
     $http.post('https://58f6jw3pl0.execute-api.us-east-1.amazonaws.com/dev/', data, config)
      .then(function(response) {


         console.log(response);

     });


   };


   vm.arePersonalInfoPasswordsEqual = function () {
     return vm.personalInfo.confirmPassword && vm.personalInfo.password == vm.personalInfo.confirmPassword;
   };



   vm.signUp = function (email,username,password) {


    AWSCognito.config.region = 'us-west-2'; //This is required to derive the endpoint

   var poolData = { UserPoolId : 'us-west-2_Wx15G37Co',
       ClientId : '50s9gm3dpvki6bsjhj9eijgsou'
   };
   var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

   var attributeList = [];

   var dataEmail = {
       Name : 'email',
       Value : email
   };

   var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);


   attributeList.push(attributeEmail);


   userPool.signUp(username, password, attributeList, null, function(err, result){
       if (err) {
           alert(err);
           return;
       }
       cognitoUser = result.user;
       console.log('user name is ' + cognitoUser.getUsername());
   });
 };




  }

})();
