"use strict";

(function() {
    angular
        .module("zombiedefense")
        .factory("UserFactory", [
            "$resource",
            UserFactoryFunction
        ]);

    function UserFactoryFunction($resource) {
        return $resource("http://worldofzed.herokuapp.com/menu", {}, {
            update: {
                method: "PUT"
            }
        });
    }
})();
