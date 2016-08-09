"use strict";

(function() {
    angular
        .module("zombiedefense")
        .controller("PlayController", [
            "$scope",
            // "$ocLazyLoad",
            "$injector",
            PlayControllerFunction
        ])

    function PlayControllerFunction($scope, $injector) {
        var vm = this;
        // $ocLazyLoad.load(['game.js'])
        //        .then(function() {
        //            // Inject the loaded module
        //            var gameFile = $injector.get('game');
        //        });


    }
})();
