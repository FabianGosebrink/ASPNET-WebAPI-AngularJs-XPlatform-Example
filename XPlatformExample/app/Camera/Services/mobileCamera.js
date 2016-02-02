(function () {

    'use strict';

    angular.module("camera.cameraModule").service('mobileCamera', mobileCamera);

    mobileCamera.$inject = ['$window', '$document', '$q', '$cordovaCamera'];

    function mobileCamera($window, $document, $q, $cordovaCamera) {

        function takePhoto() {
            var defer = $q.defer();

            var onCordovaDeviceReady = function () {
                console.log("onCordovaDeviceReady");

                var options = {
                    quality: 50,
                    destinationType: $window.Camera.DestinationType.DATA_URL,
                    sourceType: $window.Camera.PictureSourceType.CAMERA,
                    encodingType: $window.Camera.EncodingType.PNG,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };

                $cordovaCamera.getPicture(options)
                    .then(function (imageData) {
                        $document[0].removeEventListener('deviceready', onCordovaDeviceReady);
                        defer.resolve("data:image/png;base64," + imageData);
                    }, defer.reject);
            };

            $document[0].addEventListener('deviceready', onCordovaDeviceReady);

            return defer.promise;
        }

        this.takePhoto = function () {
            return takePhoto();
        };
    }
}());
