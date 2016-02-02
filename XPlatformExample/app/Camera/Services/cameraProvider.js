(function () {

    "use strict";

    angular
       .module("camera.cameraModule")
       .factory("camera.cameraProvider", cameraProvider);

    cameraProvider.$inject = ["$injector", 'platformInformation'];

    /* @ngInject */
    function cameraProvider($injector, platformInformation) {
        if (platformInformation.isCordova()) {
            console.log("mobileCamera");
            return $injector.get('mobileCamera');
        }

        console.log("desktopCamera");
        return $injector.get('desktopCamera');
    }
})();
