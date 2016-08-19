/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.dashboard.home',
    'BlurAdmin.pages.dashboard.form',
    'BlurAdmin.pages.dashboard.profile',
    'BlurAdmin.pages.dashboard.myNewPage',
    'BlurAdmin.pages.dashboard.login',
    'BlurAdmin.pages.dashboard.viewReview',
    'BlurAdmin.pages.dashboard.currentInterns',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard/home');

    baSidebarServiceProvider.addStaticItem({
      title: 'Pages',
      icon: 'ion-document',
      subMenu: [{
        title: 'Sign In',
        fixedHref: 'auth.html',
        blank: true
      }, {
        title: 'Sign Up',
        fixedHref: 'reg.html',
        blank: true
      }, {
        title: 'User Profile',
        stateRef: 'dashboard.profile'
      }, {
        title: '404 Page',
        fixedHref: '404.html',
        blank: true
      }]
    });

  }

})();
