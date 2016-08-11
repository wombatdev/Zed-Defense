"use strict";

(function() {

    angular
        .module("zombiedefense", [
            "ngResource",
            "ui.router",
            "ngAnimate"
            // "oc.lazyLoad"
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
            // .state("root", {
            //     url: "/",
            //     template: "",
            //     // controller: function($state, user) {
            //     //     if ($state.is("root")) $state.go(user.loggedIn ? "Menu" : "Splash");
            //     // }
            // })
            .state("Splash", {
                url: "/splash",
                templateUrl: "/assets/js/states/splash.html",
                controller: "SplashController",
                controllerAs: "SplashViewModel"
            })
            .state("Menu", {
                url: "/menu",
                templateUrl: "/assets/js/states/menu.html",
                controller: "MenuController",
                controllerAs: "MenuViewModel"
            })
            .state("Signup", {
                url: "/signup",
                templateUrl: "/assets/js/states/signup.html",
                controller: "SignupController",
                controllerAs: "SignupViewModel"
            })
            .state("Signin", {
                url: "/signin",
                templateUrl: "/assets/js/states/signin.html",
                controller: "SigninController",
                controllerAs: "SigninViewModel"
            })
            .state("Play", {
                url: "/play",
                templateUrl: "/assets/js/states/play.html",
                controller: "PlayController",
                controllerAs: "PlayViewModel"
            })
        $urlRouterProvider.otherwise("/")
    }

})();
