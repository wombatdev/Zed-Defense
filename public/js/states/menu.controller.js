"use strict";

(function() {
    angular
        .module("zombiedefense")
        .controller("MenuController", [
            "$scope",
            "$state",
            "$stateParams",
            "UserFactory",
            MenuControllerFunction
        ])

    function MenuControllerFunction($scope, $state, $stateParams, UserFactory) {
        var vm = this;
        $scope.pageClass = "menu";

        UserFactory.get().$promise.then(function (user) {
            console.log(user);
            vm.user = user;
        });
    }

})();
