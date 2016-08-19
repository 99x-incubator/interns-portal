(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.form')
      .controller('WizardCtrl', WizardCtrl);

  /** @ngInject */
  function WizardCtrl($scope) {
   var vm = this;

    vm.personalInfo = {};
    vm.productInfo = {};
    vm.shipment = {};

    vm.arePersonalInfoPasswordsEqual = function () {
      return vm.personalInfo.confirmPassword && vm.personalInfo.password == vm.personalInfo.confirmPassword;
    };
  }

})();
