"use strict";

(function() {
    angular
        .module("zombiedefense")
        .controller("SignupController", [
            "$scope",
            SignupControllerFunction
        ])

    function SignupControllerFunction($scope) {
        var vm = this;
        $scope.pageClass = "signup";
    }

})();
