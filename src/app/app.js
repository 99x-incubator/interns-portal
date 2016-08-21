'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'permission', 'permission.ui',
  'angular-progress-button-styles',
  'BlurAdmin.signin',
  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'BlurAdmin.theme.components'

])
.run(function(PermRoleStore, appConf) {
    PermRoleStore.defineRole('AUTHORIZED', function() {
      return appConf.isAuthorized;
    });
  })
.value('appConf', {
    isAuthorized: false,
    isCollapsed: false
  });
