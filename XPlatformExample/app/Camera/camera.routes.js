(function () {
    'use strict';

    angular
        .module('camera.cameraModule')
        .config(cameraConfig);

    cameraConfig.$inject = ['$routeProvider'];

    /* @ngInject */
    function cameraConfig($routeProvider) {

        $routeProvider.when("/camera", {
           controller: "camera.cameraController",
           controllerAs: "vm",
           templateUrl: "app/Camera/Templates/cameraView.html"
       })
       .otherwise({
           redirectTo: "/"
       });
    }
})();
