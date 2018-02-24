(function(app) {
    "use strict";

    app.factory("mxngAccountService", mxngAccountService);

    mxngAccountService.$inject = ["$location", "Constants", "$rootScope", "mxngUserService", "$http"];

    function mxngAccountService($location, Constants, $rootScope, mxngUserService, $http) {
        var service = {
            login: function(account, success, failure) {
                var successWrapper = function(response) {
                    mxngUserService.setJwt(response.data);
                    $rootScope.onLogin();
                    success(response);
                };

                var failureWrapper = function(response) {
                    failure(response);
                };

                var obj = {
                    'username': account.username,
                    'password': account.password
                };
                Object.toparams = function ObjectsToParams(obj) {
                    var p = [];
                    for (var key in obj) {
                        p.push(key + "=" + encodeURIComponent(obj[key]));
                    }
                    return p.join("&");
                };
                var req = {
                    method: "post",
                    url: Constants.tokenUrl,
                    data: Object.toparams(obj),
                    headers: { 'Content-Type': "application/x-www-form-urlencoded" }
                };
                $http(req).then(successWrapper, failureWrapper);
            },
            logout: function() {
                mxngUserService.currentUser = null;
                mxngUserService.setJwt(null);
                $rootScope.onLogout();
            }
        };

        return service;
    }

})(angular.module("mxngAuth"));