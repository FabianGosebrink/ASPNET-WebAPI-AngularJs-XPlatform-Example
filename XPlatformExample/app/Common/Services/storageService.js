(function () {

    'use strict';

    angular.module("common").service('storageService', storageService);

    storageService.$inject = ['$window'];

    function storageService($window) {
        this.setItem = function (id, item, persistToLocalStorage) {
            if (persistToLocalStorage) {
                $window.localStorage.setItem(id, JSON.stringify(item));
            } else {
                $window.sessionStorage.setItem(id, JSON.stringify(item));
            }
        };

        this.getItem = function (id) {
            var item = $window.sessionStorage.getItem(id);

            if (!item) {
                item = $window.localStorage.getItem(id);
            }
            return angular.fromJson(item);
        };

        this.removeItem = function (id) {

            var item = $window.sessionStorage.getItem(id);

            if (item) {
                $window.sessionStorage.removeItem(id);
                return;
            }

            item = $window.localStorage.getItem(id);
            if (item) {
                $window.localStorage.removeItem(id);
            }
        };

        this.getToken = function () {
            var auth = this.getItem('auth');
            if (auth) {
                return auth.access_token;
            }
            return null;
        };
    }

}());
