/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('form', {
          url: '/form',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Registration',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 250,
          },
        })

        .state('form.reg', {
          url: '/internReg',
          templateUrl: 'app/pages/form/registerIntern/internReg.html',
          title: 'New Intern',
          controller: 'internRegCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            order: 100,
          },
        })
        .state('form.wizard',
        {
          url: '/wizard',
          templateUrl: 'app/pages/form/wizard/wizard.html',
          controller: 'WizardCtrl',
          controllerAs: 'vm',
          title: 'Form Wizard',
          sidebarMeta: {
            order: 200,
          },
        });
  }
})();
