"use strict";

(function() {
    angular
        .module("zombiedefense")
        .controller("SigninController", [
            SigninControllerFunction
        ])

    function SigninControllerFunction() {
        var vm = this;
        vm.pageClass = "signin";
    }

})();
