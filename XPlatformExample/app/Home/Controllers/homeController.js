(function () {
    'use strict';

    angular
           .module('home.homeModule')
           .controller('home.controllers.homeController', HomeController);

    HomeController.$inject = ['$scope', 'home.services.peopleService', 'notificationService',
        'cfpLoadingBar', 'mysignalRservice', '_'];


    function HomeController($scope, peopleService, notificationService, cfpLoadingBar, mysignalRservice, _) {

        var vm = this;
        vm.peopleService = peopleService;
        vm.notificationService = notificationService;
        vm.allErrors = 0;
        vm.newPerson = {};
        vm.cpuUsage = 0;
        vm.date = '';
        vm.cameraButtonVisible = false;

        var getPeople = function () {
            peopleService.getAllPeople().then(
                function () {
                    //Success
                },
                function (response) {
                    //Error
                    notificationService.addError(response);
                    _updateErrors();
                });
        };

        $scope.$parent.$on('personAdded', function (e, data) {
            var personExists = _.find(peopleService.allPeople, { Id: data.Id });

            if (!personExists) {
                peopleService.allPeople.push(data);
            }
        });

        $scope.$parent.$on('personDeleted', function (e, data) {
            var personExists = _.find(peopleService.allPeople, { Id: data.Id });

            if (personExists) {
                _.remove(peopleService.allPeople, function (person) {
                    return person.Id === data.Id;
                });
            }
        });

        $scope.$parent.$on('newCpuValue', function (e, data) {
            $scope.$apply(vm.cpuUsage = data);
        });

        var _addPerson = function () {
            peopleService.addPerson(vm.newPerson)
                .success(
                    function (data) {
                        vm.newPerson = null;
                        notificationService.addSuccess('Person added');
                    }).error(
                    function (response) {
                        //Error
                        var errors = '';

                        if (response && response.ModelState) {
                            for (var key in response.ModelState) {
                                if (response.ModelState.hasOwnProperty(key)) {
                                    errors += response.ModelState[key] + '\r\n';
                                }
                            }
                        }
                        notificationService.addError(errors);
                        _updateErrors();
                    }
                );
        };

        var _deletePerson = function (personToDelete) {
            peopleService.deletePerson(personToDelete)
                .then(
                    function () {
                        notificationService.addSuccess('Person deleted');
                    },
                    function (response) {
                        //Error
                        notificationService.addError(response);
                        _updateErrors();
                    });
        };


        var _updateErrors = function () {
            vm.allErrors = _.where(notificationService.allNotifications, { isSuccess: false }).length;
        };

        getPeople();

        vm.addPerson = _addPerson;
        vm.deletePerson = _deletePerson;
    }
})();
