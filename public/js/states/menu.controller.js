"use strict";

(function() {
    angular
        .module("zombiedefense")
        .controller("MenuController", [
            MenuControllerFunction
        ])

    function MenuControllerFunction() {
        var vm = this;
        vm.pageClass = "menu";
    }

})();
