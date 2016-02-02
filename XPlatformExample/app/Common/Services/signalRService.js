(function () {
    'use strict';

    angular
        .module('common')
        .factory('mysignalRservice', mysignalRservice);

    mysignalRservice.$inject = ['$rootScope', 'appSettings'];

    /* @ngInject */
    function mysignalRservice($rootScope, appSettings) {
 
        var initialize = function () {

            if (connection) {
                return;
            }

            //Getting the connection object
            var connection = $.hubConnection(appSettings.serverPath + 'signalr');

            //Creating proxy
            this.chatProxy = connection.createHubProxy('ChatHub');
            this.personProxy = connection.createHubProxy('PersonHub');
            this.valueProxy = connection.createHubProxy('ValueHub');

            //Publishing an event when server pushes a message
            this.personProxy.on('personAdded', function (data) {
                console.log('received personAdded');
                $rootScope.$emit('personAdded', data);
            });

            this.personProxy.on('personDeleted', function (data) {
                console.log('received personDeleted');
                $rootScope.$emit('personDeleted', data);
            });

            this.chatProxy.on('addMessage', function (data) {
                console.log('received addMessage');
                $rootScope.$emit('addMessage', data);
            });

            this.valueProxy.on('newCpuValue', function (data) {
                $rootScope.$emit('newCpuValue', data);
            });


            //Starting connection
            connection.start().done(function () {
                console.log('Now connected, connection ID=' + connection.id);
            })
                .fail(function () {
                    console.log('Could not connect');
                });
        };

        var sendMessage = function (message) {
            //Invoking method defined in hub
            this.chatProxy.invoke('Send', message);
        };

        return {
            initialize: initialize,
            sendMessage: sendMessage
        };
    }
})();