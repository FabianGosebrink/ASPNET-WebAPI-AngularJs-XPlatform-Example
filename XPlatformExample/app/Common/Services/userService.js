(function () {

    'use strict';

    angular.module("common").factory('userService', userService);

    userService.$inject = ['storageService', '$location'];

    function userService(storageService, $location) {

        var loginUser = function (username, receivedAuthData, rememberMe) {
            storageService.setItem('auth', receivedAuthData, rememberMe);
            storageService.setItem('username', username, rememberMe);
        };

        var logoutUser = function () {
            storageService.removeItem('auth');
            storageService.removeItem('username');
            $location.path('/login');
        };

        var getUser = function () {
            return storageService.getItem('username');
        };

        return {
            loginUser: loginUser,
            logoutUser: logoutUser,
            getUser: getUser
        }
    }

}());
