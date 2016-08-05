"use strict";

(function() {
    angular
        .module("zombiedefense")
        .controller("SplashController", [
            "$scope",
            SplashControllerFunction
        ])

    function SplashControllerFunction($scope) {
        var socket = io();
        var vm = this;
    }

})();
