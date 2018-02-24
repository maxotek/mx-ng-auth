(function(app) {
    "use strict";

    app.factory("mxngUserService", mxngUserService);

    mxngUserService.$inject = ["$rootScope", "$localStorage"];

    function mxngUserService($rootScope, $localStorage) {
        var service = {};
        service.currentUser = null;
        service.accessToken = null;

        service.setJwt = function(token) {
            var user = null;
            if(token != null)
                user = jwt_decode(token)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

            service.currentUser = user;
            service.accessToken = token;

            service.saveState();
        };
        service.saveState = function() {
            $localStorage.user = angular.toJson(service.currentUser);
            $localStorage.accessToken = angular.toJson(service.accessToken);
        };
        service.restoreState = function() {
            service.currentUser = angular.fromJson($localStorage.user);
            service.accessToken = angular.fromJson($localStorage.accessToken);
        };
        service.getCurrentUser = function() {
            service.restoreState();
            return service.currentUser;
        };
        service.getAccessToken = function() {
            service.restoreState();
            return service.accessToken;
        };
        return service;
    }

})(angular.module("mxngAuth"));