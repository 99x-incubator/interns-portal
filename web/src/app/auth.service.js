/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.authService', [])
        .factory('AuthenticationService', AuthenticationService);

    /** @ngInject */
    function AuthenticationService($http, $rootScope, $timeout, printService) {
        var service = {};
        if (localStorage.getItem("loggedIn") === null) {
            printService.print("inside the null");
            var loggedIn = false;
            localStorage.setItem("loggedIn", JSON.stringify(loggedIn));

        } else if (localStorage.getItem("isAdmin") === null) {
            var isAdmin = false;
            localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
        } else if (localStorage.getItem("username") === null) {
            var user = "NadunI";
            localStorage.setItem("username", JSON.stringify(user));
        } else if (localStorage.getItem("token") === null) {
            var token = "NadunI";
            localStorage.setItem("token", JSON.stringify(token));
        }

        service.isLoggedIn = function() {
            printService.print("1 st in isloggedin = " + localStorage.loggedIn);
            printService.print("inside the isloggedin = " + JSON.parse(localStorage.loggedIn));
            var login = JSON.parse(localStorage.loggedIn);
            if (login) {
                return true;
            }
            return false;
        };

        service.isAdmin = function() {
            printService.print("1 st in isAdmin = " + localStorage.isAdmin);
            var admin = JSON.parse(localStorage.isAdmin);
            var login = JSON.parse(localStorage.loggedIn);

            if (admin && login) {
                return true;
            }
            return false;
        };

        service.getUser = function() {
            //printService.print("username is = " + localStorage.username);
            var user = JSON.parse(localStorage.username);

            return user;

        };

        service.setLoggedIn = function(state) {
            printService.print("setting login =  " + localStorage.loggedIn);
            printService.print("inside the isloggedin = " + JSON.parse(localStorage.loggedIn));
            var loggedIn = state;
            localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
            printService.print("then isloggedin = " + JSON.parse(localStorage.loggedIn));
        };

        service.setAdmin = function(state) {
            var admin = state;
            localStorage.setItem("isAdmin", JSON.stringify(admin));
            printService.print("set isAdmin = " + JSON.parse(localStorage.isAdmin));

        };

        service.setUser = function(user) {

            localStorage.setItem("username", JSON.stringify(user));
            printService.print("set username is  = " + JSON.parse(localStorage.username));

        };

        service.setToken = function(token) {
            printService.print("token is  = " + JSON.parse(localStorage.token));
            localStorage.setItem("token", JSON.stringify(token));
            printService.print("token is  = " + JSON.parse(localStorage.token));

        };

        service.getToken = function() {
            var token = JSON.parse(localStorage.token);
            return token;
        };

        return service;
    }
})();
