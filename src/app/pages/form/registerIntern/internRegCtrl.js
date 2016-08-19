(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.form')
      .controller('internRegCtrl',internRegCtrl);

  /** @ngInject */
  function internRegCtrl($scope) {
   var vm = this;

   vm.generalInfo ={};
   vm.contactInfo ={};
   vm.eduInsInfo ={};
   vm.internshipInfo ={};

   vm.arePersonalInfoPasswordsEqual = function () {
     return vm.personalInfo.confirmPassword && vm.personalInfo.password == vm.personalInfo.confirmPassword;
   };




  }

})();
