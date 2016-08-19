(function () {
  'use strict';

  angular.module('BlurAdmin.signin', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('signin', {
          url: '/signin',
          templateUrl: 'app/pages/signin/signin.html',
          controller: 'SignInCtrl',
<<<<<<< HEAD
          controllerAs: 'vm'
=======
          controllerAs: 'vm',
>>>>>>> 41299777c12731eb6c94fdc035b60d8894271519

        })
        ;
  }


})();
