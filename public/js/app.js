"use strict";

(function() {

    angular
        .module("zombiedefense", [
            "ngResource",
            "ui.router",
            // "ngAnimate",
            "zombies",
            // "game"
        ])
        .config([
            "$stateProvider",
            "$locationProvider",
            "$urlRouterProvider",
            RouterFunction
        ])

    function RouterFunction($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true)
        $stateProvider
            .state("Splash", {
                url: "/",
                templateUrl: "/assets/js/zombies/splash.html",
                controller: "SplashController",
                controllerAs: "SplashViewModel"
            })
            .state("Play", {
                url: "/play",
                templateUrl: "/assets/js/zombies/play.html",
                controller: "PlayController",
                controllerAs: "PlayViewModel"
            })
        $urlRouterProvider.otherwise("/")
    }

})();
