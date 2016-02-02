(function () {
    "use strict";

    angular
        .module("home.homeModule")
        .factory("home.services.peopleService", peopleService);

    peopleService.$inject = ["$http", "$q", "appSettings"];

    /* @ngInject */
    function peopleService($http, $q, appSettings) {

        var url = appSettings.serverPath + "api/person/";

        var _allPeople = [];

        var _getAllPeople = function () {

            var deferred = $q.defer();

            $http.get(url)
                .then(function (result) {
                    // Successful
                    angular.copy(result.data, _allPeople);
                    deferred.resolve(result);
                },
                    function () {
                        // Error
                        deferred.reject();
                    });

            return deferred.promise;
        };

        var _addPerson = function (newPersonToAdd) {
            return $http.post(url, newPersonToAdd);
        };

        var _deletePerson = function (personToDelete) {
            return $http.delete(url + personToDelete.Id);
        };

        return {
            getAllPeople: _getAllPeople,
            addPerson: _addPerson,
            deletePerson: _deletePerson,
            allPeople: _allPeople
        };
    }
})();
