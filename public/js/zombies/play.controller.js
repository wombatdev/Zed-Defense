"use strict";

(function() {
    angular
        .module("zombiedefense")
        .controller("PlayController", [
            "$scope",
            PlayControllerFunction
        ])

    function PlayControllerFunction($scope) {

        var socket = io();
        var vm = this;

        
    }
})();
