(function () {
    'use strict';

    angular
        .module('chatmodule')
        .config(chatconfig);

    chatconfig.$inject = ['$routeProvider'];

    /* @ngInject */
    function chatconfig($routeProvider) {

        $routeProvider
             .when("/chat", {
                 controller: "chatController",
                 controllerAs: "vm",
                 templateUrl: "app/Chat/Templates/chatView.html"
             })
             .otherwise({
                 redirectTo: "/"
             });
    }
})();
