(function () {
    'use strict';

    angular
        .module('home.homeModule')
        .config(homeconfig);

    homeconfig.$inject = ['$routeProvider'];

    /* @ngInject */
    function homeconfig($routeProvider) {
        $routeProvider
           .when("/", {
               controller: "home.controllers.homeController",
               controllerAs: "vm",
               templateUrl: "app/Home/Templates/homeOverview.html"
           })
           .otherwise({
               redirectTo: "/"
           });
    }
})();
