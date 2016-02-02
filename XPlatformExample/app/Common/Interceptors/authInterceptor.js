(function () {

    'use strict';

    angular.module("common").service('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['storageService', '$location', '$q'];

    function authInterceptor(storageService, $location, $q) {
        var service = this;

        service.request = function (config) {
            var accessToken = storageService.getToken();

            if (accessToken) {
                config.headers.authorization = 'Bearer ' + accessToken;
            }
            return config;
        };

        service.responseError = function(response) {
                if (response.status === 401) {
                    $location.path('/login');
                    return $q.reject(response);
                }

                return $q.reject(response);
            };
    }

}());
