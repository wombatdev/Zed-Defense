"use strict";

(function() {
    angular
        .module("zombiedefense")
        .controller("SplashController", [
            "$scope",
            SplashControllerFunction
        ])

    function SplashControllerFunction($scope) {
        var vm = this;
        $scope.pageClass = "splash";
        // vm.lions = false;
        // vm.cranes = false;
        // setTimeout(function() {
        //     console.log("hello");
        //     vm.lions = true;
        //     vm.cranes = true;
        //     console.log(vm.lions, vm.cranes);
        // }, 3000);


    }

})();
