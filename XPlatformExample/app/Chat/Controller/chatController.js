(function () {
    'use strict';

    angular.module('chatmodule')
           .controller('chatController', chatController);

    chatController.$inject = ['$scope', 'mysignalRservice', 'userService'];

    function chatController($scope, mysignalRservice, userService) {
        var vm = this;
        vm.chatMessages = [];
        vm.messageText = '';
        vm.username = userService.getUser();

        var _sendChat = function () {

            var message = {
                Username: vm.username,
                Text: vm.messageText,
                SentAt: new Date()
            };

            mysignalRservice.sendMessage(message);
            vm.messageText = '';
        };

        $scope.$parent.$on('addMessage', function (e, data) {
            $scope.$apply(vm.chatMessages.push(data));
        });

        vm.sendChat = _sendChat;
    }
})();