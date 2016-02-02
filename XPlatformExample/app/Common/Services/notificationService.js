(function () {
    "use strict";

    angular
        .module("common")
        .factory("notificationService", notificationService);

    notificationService.$inject = ["toastr"];

    /* @ngInject */
    function notificationService(toastr) {

        var _allNotifications = [];
        var _allErrors = 0;

        var _addSuccess = function (message) {

            var notification = {
                message: message,
                isSuccess: true,
                time: new Date()
            };

            _allNotifications.push(notification);
            toastr.success(message);
        };

        var _addError = function (message) {
            var notification = {
                message: message,
                isSuccess: false,
                time: new Date()
            };

            _allNotifications.push(notification);
            _allErrors = _.where(_allNotifications, { isSuccess: false }).length;
            console.log(_allErrors);
            toastr.error(message);
        };

        return {
            allNotifications: _allNotifications,
            addSuccess: _addSuccess,
            addError: _addError
        };
    }
})();
