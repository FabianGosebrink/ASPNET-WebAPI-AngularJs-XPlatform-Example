(function () {
    'use strict';

    angular.module('common')
           .controller('navigationController', navigationController);

    navigationController.$inject = ['userService'];

    function navigationController(userService) {

        var vm = this;

        vm.username = userService.getUser();
        vm.logoutUser = userService.logoutUser;
    }
})();
