(function () {
    'use strict';

    angular
           .module('accountModule')
           .controller('accountController', accountController);

    accountController.$inject = ['accountDataservice', '$location', 'userService', 'mysignalRservice'];

    function accountController(accountDataservice, $location, userService, mysignalRservice) {

        var vm = this;

        var _login = function () {
            accountDataservice
                .login(vm.username, vm.password)
                .then(function (data) {
                    console.log('success: ' + data);
                    userService.loginUser(vm.username, data.data, vm.rememberMe);
                    mysignalRservice.initialize();
                    $location.path('/');
                }, function (response) {
                    console.log('error ' + response);
                });
        };

        vm.login = _login;
    }
})();
