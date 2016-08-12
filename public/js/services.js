"use strict";

(function() {
angular
    .module('zombiedefense')
    .factory('AuthService', [
        '$q',
        '$timeout',
        '$http',
        'AuthServiceFunction'
    ])

  function AuthServiceFunction ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });

    function isLoggedIn() {
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    function getUserStatus() {
        return user;
    }

    function login(username, password) {
        // create a new instance of deferred
        var deferred = $q.defer();
        // send a post request to the server
        $http.get('/signup/facebook', {
            })
            // handle success
            .success(function(data, status) {
                if (status === 200 && data.status) {
                    user = true;
                    deferred.resolve();
                } else {
                    user = false;
                    deferred.reject();
                }
            })
            // handle error
            .error(function(data) {
                user = false;
                deferred.reject();
            });
        // return promise object
        return deferred.promise;

    }

};


})();
