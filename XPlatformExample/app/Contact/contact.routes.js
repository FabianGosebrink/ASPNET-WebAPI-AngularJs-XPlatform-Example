(function () {
    'use strict';

    angular
        .module('contact.contactModule')
        .config(contactconfig);

    contactconfig.$inject = ['$routeProvider'];

    /* @ngInject */
    function contactconfig($routeProvider) {

        $routeProvider
             .when("/contact", {
                 controller: "contact.controllers.contactController",
                 templateUrl: "app/Contact/Templates/contact.html"
             })
           .otherwise({
               redirectTo: "/"
           });
    }
})();
