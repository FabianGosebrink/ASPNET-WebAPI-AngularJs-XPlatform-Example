(function() {

    'use strict';

    angular.module('XPlatformExample',
        [
            'ngRoute',
            'ngAnimate',
            'ui.bootstrap',
            'angular-loading-bar',
            'toastr',
            'ngCordova',
            'common',

            'camera.cameraModule',
            'home.homeModule',
            'contact.contactModule',
            'chatmodule',
            'accountModule'
        ])
        .config([
            'cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
                cfpLoadingBarProvider.includeSpinner = false;
            }
        ])
        .config([
            '$httpProvider', function($httpProvider) {
                $httpProvider.interceptors.push('authInterceptor');
            }
        ])
        .run([
            '$rootScope', '$location', 'userService', 'storageService',
            function($rootScope, $location, userService, storageService) {
                
                $rootScope.$on('$routeChangeStart', function(event, next, current) {
                    if (next.templateUrl === 'app/Account/Templates/account.html') {
                        return;
                    }

                    var username = userService.getUser();
                    var token = storageService.getToken();

                    if (!username || !token) {
                        event.preventDefault();
                        userService.logoutUser();
                    }
                });
            }
        ])
        .constant('_', window._)
        .constant('appSettings',
        {
            //serverPath: 'http://localhost:63047/'
            serverPath: 'https://xplatformexample.azurewebsites.net/'
        });

}());
