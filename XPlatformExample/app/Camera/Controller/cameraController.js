(function () {
    'use strict';

    angular
           .module('camera.cameraModule')
           .controller('camera.cameraController', cameraController);

    cameraController.$inject = ['notificationService', 'camera.cameraProvider'];

    function cameraController(notificationService, cameraProvider) {

        var vm = this;
        vm.allImageUris = [];
        vm.showVideo = false;

        var _takePhoto = function () {
            cameraProvider.takePhoto().then(function(photo) {
                vm.allImageUris.push(photo);
                console.log(photo);
            }, function(error) {
                console.log(error);
                notificationService.addError(error);
            });
        };

        vm.takePhoto = _takePhoto;
    }
})();
