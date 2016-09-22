(function() {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('BaSidebarCtrl', BaSidebarCtrl);

    /** @ngInject */
    function BaSidebarCtrl($scope, baSidebarService, AuthenticationService) {

        var remove = [{
            name: "addtasks"
        }, {
            name: "register"
        }, {
            name: "internstasks"
        }, {
            name: "viewuser"
        }];
        $scope.menuItems = baSidebarService.getMenuItems();
        $scope.defaultSidebarState = $scope.menuItems[0].stateRef;
        var admin = AuthenticationService.isAdmin();

        if (!admin){
          _.each(remove, function(item) {
              $scope.menuItems = _.without($scope.menuItems, _.findWhere($scope.menuItems, item));
          });
        }

        $scope.hoverItem = function($event) {
            $scope.showHoverElem = true;
            $scope.hoverElemHeight = $event.currentTarget.clientHeight;
            var menuTopValue = 66;
            $scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
        };

        $scope.$on('$stateChangeSuccess', function() {
            if (baSidebarService.canSidebarBeHidden()) {
                baSidebarService.setMenuCollapsed(true);
            }
        });
    }
})();
