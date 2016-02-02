(function () {
    'use strict';

    angular
        .module('accountModule')
        .factory('accountDataservice', accountDataservice);

    accountDataservice.$inject = ['$http', 'appSettings'];

    /* @ngInject */
    function accountDataservice($http, appSettings) {

        var url = appSettings.serverPath + 'token';

        var _login = function (username, password) {
            return $http.post(url, {
                'grant_type': 'password',
                username: username,
                password: password
            }, {
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        if (obj.hasOwnProperty(p)) {
                            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                        }
                    }
                    return str.join('&');
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        };

        return {
            login: _login
        };
    }
})();
