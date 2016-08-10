"use strict";

(function() {
    angular
        .module("zombiedefense")
        .controller("SignupController", [
            "$scope",
            "UserFactory",
            SignupControllerFunction
        ])

    function SignupControllerFunction($scope, UserFactory) {
        var vm = this;
        $scope.pageClass = "signup";

        vm.newUser = new UserFactory();

        vm.create = function() {
            vm.newUser.$save().then(function(res) {
                console.log("saved!");
            })
        }
    }

})();
