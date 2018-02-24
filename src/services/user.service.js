(function(app) {
    "use strict";

    app.factory("mxngUserService", mxngUserService);

    mxngUserService.$inject = ["$rootScope", "$localStorage"];

    function mxngUserService($rootScope, $localStorage) {
        var service = {};
        service.currentUser = null;

        service.setCurrentUser = function(user) {
            service.currentUser = user;
            service.saveState();
        };
        service.saveState = function() {
            $localStorage.user = angular.toJson(service.currentUser);
        };
        service.restoreState = function() {
            service.currentUser = angular.fromJson($localStorage.user);
        };
        service.getCurrentUser = function() {
            service.restoreState();
            return service.currentUser;
        };
        return service;
    }

})(angular.module("mxngAuth"));