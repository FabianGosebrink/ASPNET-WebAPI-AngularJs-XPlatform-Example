(function () {
    'use strict';

    angular
        .module('accountModule')
        .config(setRoutes);

    setRoutes.$inject = ['$routeProvider'];

    /* @ngInject */
    function setRoutes($routeProvider) {

        $routeProvider.when('/login', {
            controller: 'accountController',
            controllerAs: 'vm',
            templateUrl: 'app/Account/Templates/account.html'
        })
     .otherwise({
         redirectTo: '/'
     });
    }
})();
